import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonItemSliding,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
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
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService
      .fetchUserBookings()
      .subscribe((bookings: BookingData[]) => {
        this.loadedBookings = bookings;
      });
  }

  ionViewDidEnter() {
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
        this.bookingSub = this.bookingService
          .cancelBooking(bookingId)
          .subscribe(() => {
            loadingEl.dismiss();
            //this.router.navigateByUrl('/vehicles/tabs/discover');
          });
      });
  }

  onOpenBookingDetail(bookingData) {
    this.bookingSub = this.bookingService
      .getSingleBooking(bookingData._id)
      .subscribe((bookingData) => {
        this.modalCtrl
          .create({
            component: BookingDetailComponent,
            componentProps: { selectedBooking: bookingData },
          })
          .then((modalEl) => {
            modalEl.present();
          });
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
