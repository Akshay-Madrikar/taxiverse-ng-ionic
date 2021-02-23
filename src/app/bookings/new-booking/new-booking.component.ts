import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Vehicle } from 'src/app/vehicles/vehicle.model';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
})
export class NewBookingComponent implements OnInit {
  @Input() selectedVehicle: Vehicle;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onBookVehicle() {
    if (!this.form.valid) return;
    this.modalCtrl.dismiss(
      {
        bookingData: {
          vehicleName: this.selectedVehicle.name,
          fuelType: this.selectedVehicle.fuelType,
          no_of_partners: +this.form.value['partner-count'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to']),
        },
      },
      'confirm'
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // datesValid() {
  //   const startDate = new String(this.form.value['dateFrom']);
  //   const endDate = new String(this.form.value['dateTo']);
  //   return endDate > startDate;
  // }
}
