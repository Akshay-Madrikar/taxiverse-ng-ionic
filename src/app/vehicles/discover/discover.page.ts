import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleData, VehiclesService } from '../vehicles.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedVehicles: VehicleData[] = [];
  listedLoadedVehicles: VehicleData[] = [];
  relevantVehicles: VehicleData[] = [];

  private vehicleSub: Subscription;

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    this.vehicleSub = this.vehiclesService
      .fetchVehicles()
      .subscribe((resData: VehicleData[]) => {
        this.loadedVehicles = resData;
        this.relevantVehicles = this.loadedVehicles;
        this.listedLoadedVehicles = this.relevantVehicles.slice(1);
      });
  }

  onFilterVehicle(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event);
    if (event.detail.value === 'bookable') {
      this.relevantVehicles = this.loadedVehicles.filter(
        (vehicle) => vehicle.bookable === 1
      );
      console.log(this.relevantVehicles);
      this.listedLoadedVehicles = this.relevantVehicles.slice(1);
    } else {
      this.relevantVehicles = this.loadedVehicles;
      this.listedLoadedVehicles = this.relevantVehicles.slice(1);
    }
  }

  ngOnDestroy() {
    if (this.vehicleSub) {
      this.vehicleSub.unsubscribe();
    }
  }
}
