import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { RoomService } from '../../services/room.service';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule, MaterialModule,  MatChipsModule, MatListModule
  ]

})
export class DashboardComponent implements OnInit {
  totalBookings = 0;
  activeBookings = 0;
  availableRooms = 0;
  totalClients = 0;
  recentBookings: any[] = [];

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.totalBookings = bookings.length;
        this.activeBookings = bookings.filter(b => b.status === 'confirmed').length;
        this.recentBookings = bookings.slice(0, 5);
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
      }
    });
  
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.availableRooms = rooms.filter(r => r.isAvailable).length;
      },
      error: (error) => {
        console.error('Error loading rooms:', error);
      }
    });
  
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.totalClients = clients.length;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }  
}
