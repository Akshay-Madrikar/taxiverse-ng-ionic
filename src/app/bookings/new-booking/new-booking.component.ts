import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
})
export class NewBookingComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onBookVehicle() {
    this.modalCtrl.dismiss({ message: 'Your booking is confirmed' }, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
