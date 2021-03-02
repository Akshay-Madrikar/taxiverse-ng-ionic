import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  VehicleData,
  VehiclesService,
} from 'src/app/vehicles/vehicles.service';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.page.html',
  styleUrls: ['./fuel-list.page.scss'],
})
export class FuelListPage implements OnInit, OnDestroy {
  vehicle: VehicleData = {
    _id: '',
    name: '',
    imageUrl: '',
    fuelType: '',
    price: null,
    fuelChecklist: [],
    availableFrom: null,
    availableTo: null,
    updatedAt: '',
    createdAt: '',
    bookable: null,
  };
  private vehicleSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private vehicleService: VehiclesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('vehicleId')) {
        this.navCtrl.navigateBack('/vehicles/tabs/discover');
        return;
      }

      this.vehicleSub = this.vehicleService
        .getSingleVehicle(paramMap.get('vehicleId'))
        .subscribe((vehicle: VehicleData) => {
          this.vehicle = vehicle;
        });
    });
  }

  ngOnDestroy() {
    if (this.vehicleSub) {
      this.vehicleSub.unsubscribe();
    }
  }
}
