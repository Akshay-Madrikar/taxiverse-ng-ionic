import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../auth/auth.service';

export interface BookingData {
  _id: string;
  vehicleId: string;
  vehicleName: string;
  userId: string;
  location: {
    source: {
      lat: number;
      lng: number;
    };
    destination: {
      lat: number;
      lng: number;
    };
    duration: number;
    distance: number;
  };
  status: number;
  partnerCount: number;
  bookedFrom: Date;
  bookedTo: Date;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  public headers: HttpHeaders;
  private authToken = this.authService.getCurrentUserToken();
  private userId = this.authService.userId;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  addBooking(bookingData) {
    const vehicleId = bookingData.vehicleId;
    return this.http
      .post(
        `${environment.API_URL}/api/booking/create/${vehicleId}/${this.userId}`,
        {
          bookingData,
        },
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.authToken}`
          ),
        }
      )
      .pipe(map((resData: BookingData) => resData));
  }

  fetchUserBookings() {
    return this.http
      .get(`${environment.API_URL}/api/booking/list/${this.userId}`, {
        headers: this.headers.append(
          'Authorization',
          `Bearer ${this.authToken}`
        ),
      })
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }

  fetchAllBookings() {
    return this.http
      .get(`${environment.API_URL}/api/booking/list-all/${this.userId}`, {
        headers: this.headers.append(
          'Authorization',
          `Bearer ${this.authToken}`
        ),
      })
      .pipe(
        map((resData: BookingData[]) => {
          return resData;
        })
      );
  }

  getSingleBooking(bookingId: string) {
    return this.http
      .get(`${environment.API_URL}/api/booking/${bookingId}`)
      .pipe(
        map((resData: BookingData) => {
          return resData;
        })
      );
  }

  fetchAddress(lat: number, lng: number) {
    return this.http
      .get(
        `http://api.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=${lat}&lng=${lng}&username=${environment.geonamesId}&style=full`
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }

  changePaymentStatus(bookingId: string) {
    return this.http
      .put(
        `${environment.API_URL}/api/booking/payment/${this.userId}`,
        {
          bookingId,
        },
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.authToken}`
          ),
        }
      )
      .pipe(map((resData: BookingData) => resData));
  }

  cancelBooking(bookingId: string) {
    return this.http
      .delete(
        `${environment.API_URL}/api/booking/${bookingId}/${this.userId}`,
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.authToken}`
          ),
        }
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
}
