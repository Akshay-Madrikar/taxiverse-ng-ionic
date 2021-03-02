import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelListPage } from './fuel-list.page';

const routes: Routes = [
  {
    path: '',
    component: FuelListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelListPageRoutingModule {}
