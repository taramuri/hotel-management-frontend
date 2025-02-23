import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { Booking } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule, MaterialModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  displayedColumns: string[] = ['client', 'room', 'dates', 'status', 'totalPrice', 'actions'];
  dataSource: MatTableDataSource<Booking> = new MatTableDataSource<Booking>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      bookings => {
        this.dataSource.data = bookings;
      },
      error => {
        console.error('Error loading bookings:', error);
      }
    );
  }

  getStatusColor(status: string): string {
    const colors = {
      'pending': 'warn',
      'confirmed': 'primary',
      'completed': 'accent',
      'cancelled': 'warn'
    };
    return colors[status as keyof typeof colors] || '';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'pending': 'Очікує',
      'confirmed': 'Підтверджено',
      'completed': 'Завершено',
      'cancelled': 'Скасовано'
    };
    return labels[status as keyof typeof labels] || status;
  }

  editBooking(id: string): void {
    this.router.navigate(['/bookings/edit', id]);
  }

  deleteBooking(id: string): void {
    if (confirm('Ви впевнені, що хочете видалити це бронювання?')) {
      this.bookingService.deleteBooking(id).subscribe(
        () => {
          this.loadBookings();
        },
        error => {
          console.error('Error deleting booking:', error);
        }
      );
    }
  }
}