import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { VehicleData } from 'src/app/vehicles/vehicles.service';
import { LocationData } from '../location.model';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
})
export class NewBookingComponent implements OnInit {
  @Input() selectedVehicle: VehicleData;
  form: FormGroup;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.form = new FormGroup({
      partnerCount: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      location: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onLocationPick(locationData: LocationData) {
    this.form.patchValue({ location: locationData });
  }

  onBookVehicle() {
    if (!this.form.valid) return;
    this.modalCtrl.dismiss(
      {
        bookingData: {
          vehicleId: this.selectedVehicle._id,
          no_of_partners: +this.form.value.partnerCount,
          startDate: new Date(this.form.value.dateFrom),
          endDate: new Date(this.form.value.dateTo),
          locationData: this.form.value.location,
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
