import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

import { RoomListComponent } from './room-list/room-list.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  declarations: [       
  ],
  imports: [
    RoomListComponent, 
    RoomFormComponent,
    CommonModule,
    RoomsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: RoomListComponent },
      { path: 'new', component: RoomFormComponent },
      { path: ':id/edit', component: RoomFormComponent }
    ])
  ]
})
export class RoomsModule { }
