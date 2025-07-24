import { Component } from '@angular/core';
import { RolesPermissionsService, RolePermission } from './roles-permissions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-roles-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="roles-permissions-container">
      <h2 class="section-title">Gestion des rôles et permissions</h2>
      
      <div class="card creation-form">
        <h3>Créer un nouveau rôle</h3>
        <form (ngSubmit)="creerRolePermission()" class="role-form">
          <div class="form-group">
            <label for="role">Nom du rôle</label>
            <input 
              [(ngModel)]="nouveau.role" 
              id="role" 
              name="role" 
              placeholder="Ex: Administrateur" 
              required 
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="permission">Ajouter une permission</label>
            <div class="permission-input-group">
              <input 
                [(ngModel)]="nouvellePermission" 
                id="permission" 
                name="permission" 
                placeholder="Ex: modifier_utilisateurs" 
                class="form-input"
              >
              <button 
                type="button" 
                (click)="ajouterPermission()" 
                class="add-permission-btn"
                [disabled]="!nouvellePermission"
              >
                <svg class="icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div *ngIf="nouveau.permissions?.length" class="permissions-list">
            <h4>Permissions ajoutées :</h4>
            <div class="permissions-tags">
              <span *ngFor="let p of nouveau.permissions" class="permission-tag">
                {{ p }}
                <button 
                  type="button" 
                  (click)="supprimerPermission(p)" 
                  class="remove-tag-btn"
                >
                  <svg class="icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </button>
              </span>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="submit-btn"
            [disabled]="!nouveau.role || !nouveau.permissions?.length"
          >
            Créer le rôle
          </button>
        </form>
      </div>
      
      <div class="card roles-list">
        <h3>Liste des rôles existants</h3>
        
        <div *ngIf="rolesPermissions.length; else noRoles" class="roles-grid">
          <div *ngFor="let rp of rolesPermissions" class="role-card">
            <div class="role-header">
              <span class="role-name">{{ rp.role }}</span>
              <button 
                (click)="supprimerRolePermission(rp.id)" 
                class="delete-btn"
                title="Supprimer ce rôle"
              >
                <svg class="icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </button>
            </div>
            
            <div class="permissions-list">
              <span class="permission-label">Permissions :</span>
              <ul>
                <li *ngFor="let p of rp.permissions">{{ p }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <ng-template #noRoles>
          <div class="empty-state">
            <svg class="icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,3C10.73,3 9.6,3.8 9.18,5H3V7H4.95L2,14C1.53,16 3,17 5.5,17C8,17 9.56,16 9,14L6.05,7H9.17C9.5,7.85 10.15,8.5 11,8.83V20H2V22H22V20H13V8.82C13.85,8.5 14.5,7.85 14.82,7H17.95L15,14C14.53,16 16,17 18.5,17C21,17 22.56,16 22,14L19.05,7H21V5H14.83C14.4,3.8 13.27,3 12,3M12,5A1,1 0 0,1 13,6A1,1 0 0,1 12,7A1,1 0 0,1 11,6A1,1 0 0,1 12,5M5.5,10.25L7,14H4L5.5,10.25M18.5,10.25L20,14H17L18.5,10.25Z" />
            </svg>
            <p>Aucun rôle/permission défini</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .roles-permissions-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }

    .section-title {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 600;
    }

    .card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .card h3 {
      color: #34495e;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .role-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #34495e;
      font-size: 0.9rem;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.375rem;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    .form-input:focus {
      border-color: #3498db;
      outline: none;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .permission-input-group {
      display: flex;
      gap: 0.5rem;
    }

    .permission-input-group .form-input {
      flex: 1;
    }

    .add-permission-btn {
      background-color: #2ecc71;
      color: white;
      border: none;
      border-radius: 0.375rem;
      padding: 0 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .add-permission-btn:hover {
      background-color: #27ae60;
    }

    .add-permission-btn:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }

    .icon {
      width: 1em;
      height: 1em;
      vertical-align: middle;
      fill: currentColor;
    }

    .permissions-list h4 {
      margin: 1rem 0 0.5rem;
      font-size: 0.9rem;
      color: #7f8c8d;
    }

    .permissions-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .permission-tag {
      background-color: #e0f7fa;
      color: #00838f;
      padding: 0.375rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .remove-tag-btn {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
    }

    .submit-btn {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    .submit-btn:hover {
      background-color: #2980b9;
    }

    .submit-btn:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }

    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .role-card {
      border: 1px solid #eee;
      border-radius: 0.5rem;
      padding: 1rem;
      transition: all 0.2s;
    }

    .role-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }

    .role-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .role-name {
      font-weight: 600;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    .delete-btn {
      background: none;
      border: none;
      color: #e74c3c;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s;
    }

    .delete-btn:hover {
      background-color: #fce8e6;
    }

    .permission-label {
      font-size: 0.8rem;
      color: #7f8c8d;
      margin-bottom: 0.5rem;
      display: block;
    }

    .permissions-list ul {
      margin: 0;
      padding-left: 1.25rem;
    }

    .permissions-list li {
      font-size: 0.9rem;
      color: #34495e;
      margin-bottom: 0.25rem;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #95a5a6;
    }

    .empty-state .icon {
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
    }

    .empty-state p {
      margin: 0;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .roles-permissions-container {
        padding: 1rem;
      }
      
      .permission-input-group {
        flex-direction: column;
      }
      
      .add-permission-btn {
        padding: 0.5rem;
      }
    }
  `]
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
    if (this.nouveau.role && this.nouveau.permissions?.length) {
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

  supprimerPermission(permission: string) {
    if (this.nouveau.permissions) {
      this.nouveau.permissions = this.nouveau.permissions.filter(p => p !== permission);
    }
  }

  supprimerRolePermission(id: number) {
    this.rolesPermissionsService.supprimerRolePermission(id).subscribe(() => this.chargerRolesPermissions());
  }
}