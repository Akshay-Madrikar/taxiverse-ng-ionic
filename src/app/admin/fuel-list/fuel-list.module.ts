import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelListPageRoutingModule } from './fuel-list-routing.module';

import { FuelListPage } from './fuel-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuelListPageRoutingModule
  ],
  declarations: [FuelListPage]
})
export class FuelListPageModule {}
