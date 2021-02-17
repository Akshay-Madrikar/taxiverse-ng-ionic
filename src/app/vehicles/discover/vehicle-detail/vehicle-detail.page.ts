import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NewBookingComponent } from 'src/app/bookings/new-booking/new-booking.component';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
})
export class VehicleDetailPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  onBookVehicle() {
    //this.navCtrl.navigateBack('/vehicles/tabs/discover');
    this.modalCtrl
      .create({ component: NewBookingComponent })
      .then((modalEl) => modalEl.present());
  }
}
