import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehiclesService } from '../vehicles.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedVehicles: Vehicle[];

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    this.loadedVehicles = this.vehiclesService.vehicles;
  }
}
