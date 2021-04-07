import { take, tap, switchMap, map } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';

interface BookingData {
  id: string;
  placeId: string;
  userId: string;
  placeTitle: string;
  placeImage: string;
  firstName: string;
  lastName: string;
  guestNumber: number;
  bookedFrom: Date;
  bookedTo: Date;
}

@Injectable({providedIn: 'root'})
export class BookingsService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  fetchBookings() {
    let fetchedUserId: string;
    return this.authService.userId
      .pipe(
        take(1),
        switchMap(userId => {
          if (!userId) {
            throw new Error('User not found');
          }
          fetchedUserId = userId;
          return this.authService.token;

        }),
        take(1),
        switchMap(token => {
          return this.http.get<{[key: string]: BookingData}>(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/my-bookings.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth="${token}"`
          );
        }),
        map(response => {
          const bookings = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  response[key].placeId,
                  response[key].userId,
                  response[key].placeTitle,
                  response[key].placeImage,
                  response[key].firstName,
                  response[key].lastName,
                  response[key].guestNumber,
                  new Date(response[key].bookedFrom),
                  new Date(response[key].bookedTo)
                )
              );
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId;
    let newBooking: Booking;
    let fetchedUserId
    return this.authService.userId
      .pipe(
        take(1),
        switchMap(userId => {
          if (!userId) {
            throw new Error('No user id found!');
          }
          fetchedUserId = userId;
          return this.authService.token;
        }),
        take(1),
        switchMap(token => {
          newBooking = new Booking(
            Math.random().toString(),
            placeId,
            fetchedUserId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo
          );
          return this.http.post<{name: string}>(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/my-bookings.json?auth=${token}`,
            { ...newBooking, id: null }
          )
        }),
        switchMap(response => {
          generatedId = response.name
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string) {
    return this.authService.token
      .pipe(
        take(1),
        switchMap(token => {
          return this.http.delete(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/my-bookings/${bookingId}.json?auth=${token}`
          )
        }),
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings.filter(b => b.id !== bookingId));
        })
      );
  }
}
