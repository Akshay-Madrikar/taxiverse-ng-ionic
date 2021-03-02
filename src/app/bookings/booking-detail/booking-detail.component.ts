import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingData, BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
})
export class BookingDetailComponent implements OnInit, OnDestroy {
  @Input() selectedBooking: BookingData;
  private bookingSub: Subscription;
  sourceName: string;
  destinationName: string;
  durationInHours: number;

  constructor(
    private modalCtrl: ModalController,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.durationInHours =
      Math.round((this.selectedBooking.location.duration / 60) * 100) / 100;
    this.bookingSub = this.bookingService
      .fetchAddress(
        this.selectedBooking.location.source.lat,
        this.selectedBooking.location.source.lng
      )
      .subscribe((resData: any) => {
        console.log;
        this.sourceName = `${resData.geonames[0].asciiName}, ${resData.geonames[0].adminName2} , ${resData.geonames[0].adminName1}`;
      });

    this.bookingSub = this.bookingService
      .fetchAddress(
        this.selectedBooking.location.destination.lat,
        this.selectedBooking.location.destination.lng
      )
      .subscribe((resData: any) => {
        console.log;
        this.destinationName = `${resData.geonames[0].asciiName}, ${resData.geonames[0].adminName2} , ${resData.geonames[0].adminName1}`;
      });
  }

  onPayment(bookingId: string) {
    this.bookingService.changePaymentStatus(bookingId).subscribe(() => {
      this.modalCtrl.dismiss();
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
