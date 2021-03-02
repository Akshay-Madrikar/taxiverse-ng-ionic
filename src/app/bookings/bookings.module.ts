import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BookingsPageRoutingModule],
  declarations: [BookingsPage, BookingDetailComponent],
})
export class BookingsPageModule {}
