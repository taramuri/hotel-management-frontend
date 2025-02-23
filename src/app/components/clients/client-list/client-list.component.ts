import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, MaterialModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'passportData', 'actions'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      clients => {
        this.dataSource.data = clients;
      },
      error => {
        console.error('Error loading clients:', error);
        // TODO: Add error handling/notification
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editClient(id: string): void {
    this.router.navigate(['/clients/edit', id]);
  }

  deleteClient(id: string): void {
    if (confirm('Ви впевнені, що хочете видалити цього клієнта?')) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          this.loadClients();
          // TODO: Add success notification
        },
        error => {
          console.error('Error deleting client:', error);
          // TODO: Add error handling/notification
        }
      );
    }
  }
}