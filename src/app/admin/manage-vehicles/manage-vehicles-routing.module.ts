import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageVehiclesPage } from './manage-vehicles.page';

const routes: Routes = [
  {
    path: '',
    component: ManageVehiclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageVehiclesPageRoutingModule {}
