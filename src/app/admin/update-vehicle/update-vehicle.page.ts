import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { VehiclesService } from 'src/app/vehicles/vehicles.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.page.html',
  styleUrls: ['./update-vehicle.page.scss'],
})
export class UpdateVehiclePage implements OnInit, OnDestroy {
  vehicleSub: Subscription;
  vehicleId: string;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = '2022-12-31';

  constructor(
    private vehicleService: VehiclesService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('vehicleId')) {
        return;
      }
      this.vehicleId = paramMap.get('vehicleId');
    });
  }

  onUpdateVehicle(form: NgForm) {
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
      .create({ message: 'Updating vehicle...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.vehicleSub = this.vehicleService
          .updateVehicle(vehicleData, this.vehicleId)
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
