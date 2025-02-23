import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  imports: [CommonModule, MaterialModule, RouterModule],
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  displayedColumns: string[] = ['number', 'type', 'capacity', 'price', 'isAvailable', 'actions'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource<Room>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(
      rooms => {
        this.dataSource.data = rooms;
      },
      error => {
        console.error('Error loading rooms:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRoom(id: string): void {
    this.router.navigate(['/rooms/edit', id]);
  }

  deleteRoom(id: string): void {
    if (confirm('Ви впевнені, що хочете видалити цей номер?')) {
      this.roomService.deleteRoom(id).subscribe(
        () => {
          this.loadRooms();
        },
        error => {
          console.error('Error deleting room:', error);
        }
      );
    }
  }

  getRoomTypeName(type: string): string {
    const types = {
      'luxury': 'Люкс',
      'semi-luxury': 'Напівлюкс',
      'standard': 'Стандарт'
    };
    return types[type as keyof typeof types] || type;
  }
}