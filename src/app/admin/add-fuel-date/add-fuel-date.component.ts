import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  VehicleData,
  VehiclesService,
} from 'src/app/vehicles/vehicles.service';

@Component({
  selector: 'app-add-fuel-date',
  templateUrl: './add-fuel-date.component.html',
  styleUrls: ['./add-fuel-date.component.scss'],
})
export class AddFuelDateComponent implements OnInit {
  @Input() selectedVehicle: VehicleData;
  form: FormGroup;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.form = new FormGroup({
      fillDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onAddFuelDate() {
    if (!this.form.valid) return;
    this.modalCtrl.dismiss(
      {
        fuelDateData: {
          fillDate: new Date(this.form.value.fillDate),
        },
      },
      'confirm'
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
