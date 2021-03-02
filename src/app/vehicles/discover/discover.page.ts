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
  private vehicleSub: Subscription;

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    this.vehicleSub = this.vehiclesService
      .fetchVehicles()
      .subscribe((resData: VehicleData[]) => {
        this.loadedVehicles = resData;
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
