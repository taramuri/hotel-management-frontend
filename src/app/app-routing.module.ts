import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'clients',
        loadChildren: () => import('./components/clients/clients.module')
          .then(m => m.ClientsModule)
      },
      {
        path: 'rooms',
        loadChildren: () => import('./components/rooms/rooms.module')
          .then(m => m.RoomsModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('./components/bookings/bookings.module')
          .then(m => m.BookingsModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }