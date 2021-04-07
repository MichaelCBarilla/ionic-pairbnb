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
    return this.http.get<{[key: string]: PlaceData}>(
      'https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places.json'
    ).pipe(
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
    return this.http.get<PlaceData>(
      `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places/${id}.json`
    ).pipe(
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

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation
  ) {
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title, description,
      'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId,
      location
    );
    return this.http.post<{name: string}>(
      'https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places.json',
      {...newPlace, id: null}
    ).pipe(
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
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(places => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
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
          `https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null}
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
