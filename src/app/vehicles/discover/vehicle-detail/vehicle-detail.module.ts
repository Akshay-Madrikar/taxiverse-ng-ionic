import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleDetailPageRoutingModule } from './vehicle-detail-routing.module';

import { VehicleDetailPage } from './vehicle-detail.page';
import { NewBookingComponent } from '../../../bookings/new-booking/new-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddFuelDateComponent } from 'src/app/admin/add-fuel-date/add-fuel-date.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    VehicleDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [VehicleDetailPage, NewBookingComponent, AddFuelDateComponent],
})
export class VehicleDetailPageModule {}
