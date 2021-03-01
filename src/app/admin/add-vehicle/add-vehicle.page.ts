import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { VehiclesService } from 'src/app/vehicles/vehicles.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit, OnDestroy {
  vehicleSub: Subscription;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = '2022-12-31';

  constructor(
    private vehicleService: VehiclesService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onAddVehicle(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const vehicleData = {
      vehicleName: form.value['vehicleName'],
      imageUrl: form.value['imageUrl'],
      fuelType: form.value['fuelType'],
      price: +form.value['price'],
      bookable: +form.value['bookable'],
      availableFrom: new Date(form.value['available-from']),
      availableTo: new Date(form.value['available-to']),
    };

    this.loadingCtrl
      .create({ message: 'Adding vehicle...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.vehicleSub = this.vehicleService
          .addVehicle(vehicleData)
          .subscribe(() => {
            loadingEl.dismiss();
          });
      });

    form.reset();
  }

  ngOnDestroy() {
    if (this.vehicleSub) {
      this.vehicleSub.unsubscribe();
    }
  }
}
