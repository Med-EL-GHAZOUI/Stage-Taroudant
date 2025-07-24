import { Component } from '@angular/core';
import { ComptesUtilisateursService, CompteUtilisateur } from './comptes-utilisateurs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-comptes-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <h2 class="admin-title">Gestion des comptes utilisateurs</h2>
      
      <div class="form-card">
        <h3>
          <svg class="icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          Créer un nouveau compte
        </h3>
        <form (ngSubmit)="creerCompte()" class="user-form">
          <div class="form-group">
            <label for="nom">Nom complet</label>
            <input 
              [(ngModel)]="nouveau.nom" 
              id="nom" 
              name="nom" 
              placeholder="Entrez le nom complet" 
              required 
              class="form-input" 
            />
          </div>
          
          <div class="form-group">
            <label for="email">Adresse email</label>
            <input 
              [(ngModel)]="nouveau.email" 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Entrez l'email" 
              required 
              class="form-input" 
            />
          </div>
          
          <div class="form-group">
            <label for="role">Rôle</label>
            <select 
              [(ngModel)]="nouveau.role" 
              id="role" 
              name="role" 
              required 
              class="form-input"
            >
              <option value="" disabled selected>Sélectionnez un rôle</option>
              <option value="admin">Administrateur</option>
              <option value="editor">Éditeur</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>
          
          <button type="submit" class="submit-btn">Créer le compte</button>
        </form>
      </div>
      
      <div class="list-card">
        <h3>Liste des comptes ({{comptes.length}})</h3>
        
        <div *ngIf="comptes.length > 0; else noAccounts" class="accounts-list">
          <div *ngFor="let compte of comptes" class="account-item">
            <div class="account-info">
              <span class="account-name">{{ compte.nom }}</span>
              <span class="account-email">{{ compte.email }}</span>
              <span class="account-role" [class]="'role-' + compte.role">
                {{ getRoleLabel(compte.role) }}
              </span>
            </div>
            <button (click)="supprimerCompte(compte.id)" class="delete-btn">
              <svg class="icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
        </div>
        
        <ng-template #noAccounts>
          <div class="empty-state">
            <svg class="icon large" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" />
              <path fill="currentColor" d="M13.5,10H10.5L9.5,9H14.5L13.5,10Z" />
            </svg>
            <p>Aucun compte utilisateur trouvé</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }

    .admin-title {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 600;
    }

    .form-card, .list-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-card h3, .list-card h3 {
      color: #34495e;
      margin-top: 0;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon {
      width: 1em;
      height: 1em;
      vertical-align: middle;
      fill: currentColor;
    }

    .icon.large {
      width: 2em;
      height: 2em;
    }

    .user-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    select.form-input {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1em;
    }

    .submit-btn {
      grid-column: span 2;
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
      font-size: 0.9rem;
    }

    .submit-btn:hover {
      background-color: #2980b9;
    }

    .accounts-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .account-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 0.375rem;
      transition: all 0.2s;
    }

    .account-item:hover {
      background-color: #f8f9fa;
    }

    .account-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .account-name {
      font-weight: 600;
      color: #2c3e50;
      font-size: 0.95rem;
    }

    .account-email {
      font-size: 0.85rem;
      color: #7f8c8d;
    }

    .account-role {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      display: inline-block;
      width: fit-content;
      color: white;
    }

    .role-admin {
      background-color: #e74c3c;
    }

    .role-editor {
      background-color: #f39c12;
    }

    .role-user {
      background-color: #2ecc71;
    }

    .delete-btn {
      background: none;
      border: none;
      color: #e74c3c;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete-btn:hover {
      background-color: #fce8e6;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #95a5a6;
    }

    .empty-state p {
      margin-top: 1rem;
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .user-form {
        grid-template-columns: 1fr;
      }
      
      .submit-btn {
        grid-column: span 1;
      }
    }
  `]
})
export class AdminComptesUtilisateursComponent {
  comptes: CompteUtilisateur[] = [];
  nouveau: Partial<CompteUtilisateur> = { nom: '', email: '', role: '' };

  constructor(private comptesService: ComptesUtilisateursService) {
    this.chargerComptes();
  }

  chargerComptes() {
    this.comptesService.getComptes().subscribe(list => this.comptes = list);
  }

  creerCompte() {
    if (this.nouveau.nom && this.nouveau.email && this.nouveau.role) {
      this.comptesService.creerCompte(this.nouveau).subscribe(() => {
        this.nouveau = { nom: '', email: '', role: '' };
        this.chargerComptes();
      });
    }
  }

  supprimerCompte(id: number) {
    this.comptesService.supprimerCompte(id).subscribe(() => this.chargerComptes());
  }

  getRoleLabel(role: string): string {
    switch(role) {
      case 'admin': return 'Administrateur';
      case 'editor': return 'Éditeur';
      case 'user': return 'Utilisateur';
      default: return role;
    }
  }
}