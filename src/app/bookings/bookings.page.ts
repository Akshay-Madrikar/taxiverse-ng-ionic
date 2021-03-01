import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingData, BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: BookingData[];
  private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService
      .fetchUserBookings()
      .subscribe((bookings: BookingData[]) => {
        this.loadedBookings = bookings;
      });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Cancelling booking...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
          //this.router.navigateByUrl('/vehicles/tabs/discover');
        });
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
