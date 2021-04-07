import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController, LoadingController, AlertController } from '@ionic/angular';

import { MapModalComponent } from './../../../shared/map-modal/map-modal.component';
import { AuthService } from './../../../auth/auth.service';
import { BookingsService } from './../../../bookings/bookings.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from './../../places.model';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingsService: BookingsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      let fetchedUserId: string;
      this.authService.userId
        .pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('Found no user!');
            }
            fetchedUserId = userId
            return this.placesService.getPlace(paramMap.get('placeId'));
          })
        )
        .subscribe(place => {
          this.place = place;
          this.isBookable = place.userId !== fetchedUserId;
          this.isLoading = false;
        }, error => {
          this.alertCtrl
            .create({
              header: 'An error occured!',
              message: 'Could not load place',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigateByUrl('/places/tabs/discover');
                  }
                }
              ]
            }).then(alertEl => {
                alertEl.present();
              }
            );
      });
    });
  }

  onBookPlace() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModel('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModel('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModel(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      }).then(resultData => {
        const data = resultData.data.bookingData;
        if (resultData.role === 'confirm') {
          this.loadingCtrl.create({message: 'Booking place...'})
            .then(loadingEl => {
              loadingEl.present();
              this.bookingsService.addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              ).subscribe(() => {
                loadingEl.dismiss();
              });
            })
        }
      });
  }

  onShowFullMap() {
    this.modalCtrl.create({
      component: MapModalComponent,
      componentProps: {
        center: {
          lat: this.place.location.lat,
          lng: this.place.location.lng
        },
        selectable: false,
        closeButtonText: 'Close',
        title: this.place.location.address
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }

  ngOnDestroy() {
    if (this.placeSub) this.placeSub.unsubscribe();
  }

}
