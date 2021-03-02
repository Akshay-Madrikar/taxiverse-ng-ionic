import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonItemSliding,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingDetailComponent } from 'src/app/bookings/booking-detail/booking-detail.component';
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
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService
      .fetchAllBookings()
      .subscribe((bookings: BookingData[]) => {
        this.loadedBookings = bookings;
      });
  }

  ionViewDidEnter() {
    this.bookingSub = this.bookingService
      .fetchAllBookings()
      .subscribe((bookings: BookingData[]) => {
        this.loadedBookings = bookings;
      });
  }

  // onOpenBookingDetail(bookingData) {
  //   this.bookingSub = this.bookingService
  //     .getSingleBooking(bookingData._id)
  //     .subscribe((bookingData) => {
  //       this.modalCtrl
  //         .create({
  //           component: BookingDetailComponent,
  //           componentProps: { selectedBooking: bookingData },
  //         })
  //         .then((modalEl) => {
  //           modalEl.present();
  //         });
  //     });
  // }

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
          });
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
