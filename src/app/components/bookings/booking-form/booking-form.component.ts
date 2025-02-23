import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { ClientService } from '../../../services/client.service';
import { RoomService } from '../../../services/room.service';
import { Client } from '../../../models/client.model';
import { Room } from '../../../models/room.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, MaterialModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  clients: Client[] = [];
  rooms: Room[] = [];
  isEdit = false;
  bookingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private clientService: ClientService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookingForm = this.fb.group({
      client: ['', Validators.required],
      room: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      status: ['pending', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadRooms();

    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId) {
      this.isEdit = true;
      this.loadBooking(this.bookingId);
    }
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients,
      error => console.error('Error loading clients:', error)
    );
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(
      rooms => this.rooms = rooms,
      error => console.error('Error loading rooms:', error)
    );
  }

  loadBooking(id: string): void {
    this.bookingService.getBooking(id).subscribe(
      booking => {
        this.bookingForm.patchValue({
          // client: booking.client._id,
          // room: booking.room._id,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          status: booking.status,
          notes: booking.notes
        });
      },
      error => console.error('Error loading booking:', error)
    );
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      if (this.isEdit && this.bookingId) {
        this.bookingService.updateBooking(this.bookingId, this.bookingForm.value).subscribe(
          () => this.router.navigate(['/bookings']),
          error => console.error('Error updating booking:', error)
        );
      } else {
        this.bookingService.createBooking(this.bookingForm.value).subscribe(
          () => this.router.navigate(['/bookings']),
          error => console.error('Error creating booking:', error)
        );
      }
    }
  }

  calculateTotalNights(): number {
    const checkIn = this.bookingForm.get('checkInDate')?.value;
    const checkOut = this.bookingForm.get('checkOutDate')?.value;
    if (checkIn && checkOut) {
      const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  }
}