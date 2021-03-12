import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/add-vehicle',
    loadChildren: () =>
      import('./admin/add-vehicle/add-vehicle.module').then(
        (m) => m.AddVehiclePageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/manage-vehicles',
    loadChildren: () =>
      import('./admin/manage-vehicles/manage-vehicles.module').then(
        (m) => m.ManageVehiclesPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/bookings-list',
    loadChildren: () =>
      import('./admin/bookings-list/bookings-list.module').then(
        (m) => m.BookingsListPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/manage-users',
    loadChildren: () =>
      import('./admin/manage-users/manage-users.module').then(
        (m) => m.ManageUsersPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/fuel-list/:vehicleId',
    loadChildren: () =>
      import('./admin/fuel-list/fuel-list.module').then(
        (m) => m.FuelListPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/update-vehicle/:vehicleId',
    loadChildren: () =>
      import('./admin/update-vehicle/update-vehicle.module').then(
        (m) => m.UpdateVehiclePageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
