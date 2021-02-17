import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesPage } from './vehicles.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/discover',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: VehiclesPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./discover/discover.module').then(
                (m) => m.DiscoverPageModule
              ),
          },
          {
            path: ':vehicleId',
            loadChildren: () =>
              import('./discover/vehicle-detail/vehicle-detail.module').then(
                (m) => m.VehicleDetailPageModule
              ),
          },
        ],
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('../bookings/bookings.module').then(
            (m) => m.BookingsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesPageRoutingModule {}
