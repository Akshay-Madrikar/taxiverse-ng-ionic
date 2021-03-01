import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageVehiclesPageRoutingModule } from './manage-vehicles-routing.module';

import { ManageVehiclesPage } from './manage-vehicles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageVehiclesPageRoutingModule
  ],
  declarations: [ManageVehiclesPage]
})
export class ManageVehiclesPageModule {}
