import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-form',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  roomForm: FormGroup;
  isEditMode = false;
  roomId: string | null = null;

  roomTypes = [
    { value: 'luxury', label: 'Люкс' },
    { value: 'semi-luxury', label: 'Напівлюкс' },
    { value: 'standard', label: 'Стандарт' }
  ];

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomForm = this.fb.group({
      number: ['', [Validators.required]],
      type: ['', [Validators.required]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      isAvailable: [true]
    });
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if (this.roomId) {
      this.isEditMode = true;
      this.loadRoom(this.roomId);
    }
  }

  loadRoom(id: string): void {
    this.roomService.getRoom(id).subscribe(
      room => {
        this.roomForm.patchValue(room);
      },
      error => {
        console.error('Error loading room:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const roomData = this.roomForm.value;
      
      if (this.isEditMode && this.roomId) {
        this.roomService.updateRoom(this.roomId, roomData).subscribe(
          () => {
            this.router.navigate(['/rooms']);
          },
          error => {
            console.error('Error updating room:', error);
          }
        );
      } else {
        this.roomService.createRoom(roomData).subscribe(
          () => {
            this.router.navigate(['/rooms']);
          },
          error => {
            console.error('Error creating room:', error);
          }
        );
      }
    }
  }
}