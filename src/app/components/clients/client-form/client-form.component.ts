import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, MaterialModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      passportData: ['', [Validators.required]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.isEditMode = true;
      this.loadClient(this.clientId);
    }
  }

  loadClient(id: string): void {
    this.clientService.getClient(id).subscribe(
      client => {
        this.clientForm.patchValue(client);
      },
      error => {
        console.error('Error loading client:', error);
        // TODO: Add error handling/notification
      }
    );
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      
      if (this.isEditMode && this.clientId) {
        this.clientService.updateClient(this.clientId, clientData).subscribe(
          () => {
            this.router.navigate(['/clients']);
            // TODO: Add success notification
          },
          error => {
            console.error('Error updating client:', error);
            // TODO: Add error handling/notification
          }
        );
      } else {
        this.clientService.createClient(clientData).subscribe(
          () => {
            this.router.navigate(['/clients']);
            // TODO: Add success notification
          },
          error => {
            console.error('Error creating client:', error);
            // TODO: Add error handling/notification
          }
        );
      }
    }
  }
}