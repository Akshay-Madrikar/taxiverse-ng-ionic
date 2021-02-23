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
  loadedVehicles: Vehicle[];
  private vehicleSub: Subscription;

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    // this.vehiclesService.fetchVehicles().subscribe((resData) => {
    //   this.loadedVehicles = resData;
    //   console.log(this.loadedVehicles[0], '*************');
    // });
    this.vehicleSub = this.vehiclesService.vehicles.subscribe((vehicles) => {
      console.log(vehicles);
      this.loadedVehicles = vehicles;
    });
  }

  onFilterVehicle(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event);
  }

  ngOnDestroy() {
    if (this.vehicleSub) {
      this.vehicleSub.unsubscribe();
    }
  }
}
