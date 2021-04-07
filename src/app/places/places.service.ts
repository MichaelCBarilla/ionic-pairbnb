import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';
import { Place } from './places.model';
import { PlaceLocation } from './location.model';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  // new Place(
  //   'p1',
  //   'Manhattan Mansion',
  //   'In the heart of New York City',
  //   'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/854fifthavenue-uppereastsidenewyork-tristan-harper-douglaselliman-photography-50524160-high-res-1493310151.jpg',
  //   149.99,
  //   new Date('2019-01-01'),
  //   new Date('2019-12-31'),
  //   'abc'
  // ),
  // new Place(
  //   'p2',
  //   'L\'Amour Toujours',
  //   'A romantic place in Paris',
  //   'https://www.parisperfect.com/g/hi-margaux-main.jpg',
  //   189.99,
  //   new Date('2019-01-01'),
  //   new Date('2019-12-31'),
  //   'abc'
  // ),
  // new Place(
  //   'p3',
  //   'The Foggy Palace',
  //   'Not your average city trip!',
  //   'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg',
  //   99.99,
  //   new Date('2019-01-01'),
  //   new Date('2019-12-31'),
  //   'abc'
  // )

  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces() {
    return this.authService.token
      .pipe(
        take(1),
        switchMap(token => {
          return this.http.get<{[key: string]: PlaceData}>(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places.json?auth=${token}`
          )
        }),
        map(response => {
          const places = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  response[key].title,
                  response[key].description,
                  response[key].imageUrl,
                  response[key].price,
                  new Date(response[key].availableFrom),
                  new Date(response[key].availableTo),
                  response[key].userId,
                  response[key].location
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
    );
  }

  getPlace(id: string) {
    return this.authService.token
      .pipe(
        take(1),
        switchMap(token => {
          return this.http.get<PlaceData>(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places/${id}.json?auth=${token}`
          )
        }),
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId,
            placeData.location
          )
        })
    )
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.authService.token
      .pipe(
        take(1),
        switchMap(token => {
          console.log(token);
          return this.http.post<{imageUrl: string, imagePath: string}>(
            'https://us-central1-ionic-angular-course-22b9c.cloudfunctions.net/storeImage',
            uploadData,
            {headers: {Authorization: 'Bearer ' + token}}
          );
        })
      );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    imageUrl: string
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newPlace: Place;
    return this.authService.userId
      .pipe(
        take(1),
        switchMap(userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }),
        take(1),
        switchMap(token => {
          if (!fetchedUserId) {
            throw new Error('No user id found!');
          }
          newPlace = new Place(
            Math.random().toString(),
            title, description,
            imageUrl,
            price,
            dateFrom,
            dateTo,
            fetchedUserId,
            location
          );
          return this.http.post<{name: string}>(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places.json?auth=${token}`,
            {...newPlace, id: null}
          )
        }),
        switchMap(response => {
          generatedId = response.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let fetchedToken: string;
    let updatedPlaces: Place[];
    return this.authService.token
      .pipe(
        take(1),
        switchMap(token => {
          fetchedToken = token;
          return this.places;
        }),
        take(1),
        switchMap(places => {
          if (!places || places.length <= 0) {
            return this.fetchPlaces();
          } else {
            return of(places)
          }
        }),
        switchMap(places => {
          const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
          updatedPlaces = [...places];
          const oldPlace = updatedPlaces[updatedPlaceIndex];
          updatedPlaces[updatedPlaceIndex] = new Place(
            oldPlace.id,
            title,
            description,
            oldPlace.imageUrl,
            oldPlace.price,
            oldPlace.availableFrom,
            oldPlace.availableTo,
            oldPlace.userId,
            oldPlace.location
          );
          return this.http.put(
            `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places/${placeId}.json?auth=${fetchedToken}`,
            { ...updatedPlaces[updatedPlaceIndex], id: null}
          );
        }),
        tap(() => {
          this._places.next(updatedPlaces);
        })
      );
  }
}
