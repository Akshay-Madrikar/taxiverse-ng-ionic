import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleDetailPageRoutingModule } from './vehicle-detail-routing.module';

import { VehicleDetailPage } from './vehicle-detail.page';
import { NewBookingComponent } from '../../../bookings/new-booking/new-booking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleDetailPageRoutingModule,
  ],
  declarations: [VehicleDetailPage, NewBookingComponent],
})
export class VehicleDetailPageModule {}
