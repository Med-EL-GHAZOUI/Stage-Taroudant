import { Component } from '@angular/core';
import { RolesPermissionsService, RolePermission } from './roles-permissions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-roles-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gestion des rôles et permissions</h2>
    <form (ngSubmit)="creerRolePermission()">
      <input [(ngModel)]="nouveau.role" name="role" placeholder="Rôle" required />
      <input [(ngModel)]="nouvellePermission" name="permission" placeholder="Permission" />
      <button type="button" (click)="ajouterPermission()">Ajouter permission</button>
      <ul>
        <li *ngFor="let p of nouveau.permissions">{{ p }}</li>
      </ul>
      <button type="submit">Créer</button>
    </form>
    <ul>
      <li *ngFor="let rp of rolesPermissions">
        <strong>{{ rp.role }}</strong> : {{ rp.permissions.join(', ') }}
        <button (click)="supprimerRolePermission(rp.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!rolesPermissions.length">Aucun rôle/permission.</p>
  `,
  styleUrls: []
})
export class AdminRolesPermissionsComponent {
  rolesPermissions: RolePermission[] = [];
  nouveau: Partial<RolePermission> = { role: '', permissions: [] };
  nouvellePermission = '';

  constructor(private rolesPermissionsService: RolesPermissionsService) {
    this.chargerRolesPermissions();
  }

  chargerRolesPermissions() {
    this.rolesPermissionsService.getRolesPermissions().subscribe(list => this.rolesPermissions = list);
  }

  creerRolePermission() {
    if (this.nouveau.role) {
      this.rolesPermissionsService.creerRolePermission(this.nouveau).subscribe(() => {
        this.nouveau = { role: '', permissions: [] };
        this.nouvellePermission = '';
        this.chargerRolesPermissions();
      });
    }
  }

  ajouterPermission() {
    if (this.nouvellePermission) {
      if (!this.nouveau.permissions) this.nouveau.permissions = [];
      this.nouveau.permissions.push(this.nouvellePermission);
      this.nouvellePermission = '';
    }
  }

  supprimerRolePermission(id: number) {
    this.rolesPermissionsService.supprimerRolePermission(id).subscribe(() => this.chargerRolesPermissions());
  }
} 