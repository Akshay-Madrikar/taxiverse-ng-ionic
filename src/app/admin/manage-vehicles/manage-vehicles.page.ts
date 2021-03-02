import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  VehicleData,
  VehiclesService,
} from 'src/app/vehicles/vehicles.service';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.page.html',
  styleUrls: ['./manage-vehicles.page.scss'],
})
export class ManageVehiclesPage implements OnInit, OnDestroy {
  loadedVehicles: VehicleData[];
  private vehicleSub: Subscription;

  constructor(
    private vehiclesService: VehiclesService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.vehicleSub = this.vehiclesService
      .fetchVehicles()
      .subscribe((resData: VehicleData[]) => {
        this.loadedVehicles = resData;
      });
  }

  onUpdateVehicle(vehicleId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.router.navigateByUrl(`/admin/update-vehicle/${vehicleId}`);
  }

  onRemoveVehicle(vehicleId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Deleting vehicle...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.vehiclesService.onRemoveVehicle(vehicleId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  ngOnDestroy() {
    if (this.vehicleSub) {
      this.vehicleSub.unsubscribe();
    }
  }
}
