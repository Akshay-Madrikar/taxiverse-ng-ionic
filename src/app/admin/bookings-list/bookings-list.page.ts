import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingData, BookingService } from 'src/app/bookings/booking.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.page.html',
  styleUrls: ['./bookings-list.page.scss'],
})
export class BookingsListPage implements OnInit, OnDestroy {
  loadedBookings: BookingData[];
  private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService
      .fetchAllBookings()
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
        });
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
