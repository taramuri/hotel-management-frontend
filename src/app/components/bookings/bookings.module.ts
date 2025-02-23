import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingsRoutingModule } from './bookings-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BookingListComponent,
    BookingFormComponent
  ]
})
export class BookingsModule { }