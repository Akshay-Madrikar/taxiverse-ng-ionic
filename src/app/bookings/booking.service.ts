import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
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
  constructor(private authService: AuthService) {}

  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(
    vehicleId: string,
    vehicleName: string,
    vehicleImage: string,
    partnerCount: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      vehicleId,
      vehicleName,
      vehicleImage,
      this.authService.userId,
      partnerCount,
      dateFrom,
      dateTo
    );
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this._bookings.next(bookings.filter((b) => b.id !== bookingId));
      })
    );
  }
}
