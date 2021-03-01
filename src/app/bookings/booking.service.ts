import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap, delay, map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

export interface BookingData {
  _id: string;
  vehicleId: string;
  vehicleName: string;
  userId: string;
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
        `http://localhost:5000/api/booking/create/${vehicleId}/${this.userId}`,
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
      .pipe(map((resData) => resData));
  }

  fetchUserBookings() {
    return this.http
      .get(`http://localhost:5000/api/booking/list/${this.userId}`, {
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
      .get(`http://localhost:5000/api/booking/list-all/${this.userId}`, {
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

  // const newBooking = new Booking(
  //   Math.random().toString(),
  //   vehicleId,
  //   vehicleName,
  //   vehicleImage,
  //   this.authService.userId,
  //   partnerCount,
  //   dateFrom,
  //   dateTo
  // );
  // return this.bookings.pipe(
  //   take(1),
  //   delay(1000),
  //   tap((bookings) => {
  //     this._bookings.next(bookings.concat(newBooking));
  //   })
  // );

  cancelBooking(bookingId: string) {
    return this.http
      .delete(`http://localhost:5000/api/booking/${bookingId}/${this.userId}`, {
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
}

// private _bookings: Booking[] = [
//   {
//     id: 'xyz',
//     vehicleId: 'p1',
//     vehicleName: 'Wagon R',
//     userId: 'abc',
//   },
// ];

// get bookings() {
//   return [...this._bookings];
// }

// get bookings() {
//   return this._bookings.asObservable();
// }
