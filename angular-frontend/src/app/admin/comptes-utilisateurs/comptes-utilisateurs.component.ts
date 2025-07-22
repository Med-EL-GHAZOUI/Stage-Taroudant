import { Component } from '@angular/core';
import { ComptesUtilisateursService, CompteUtilisateur } from './comptes-utilisateurs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-comptes-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gestion des comptes utilisateurs</h2>
    <form (ngSubmit)="creerCompte()">
      <input [(ngModel)]="nouveau.nom" name="nom" placeholder="Nom" required />
      <input [(ngModel)]="nouveau.email" name="email" placeholder="Email" required />
      <input [(ngModel)]="nouveau.role" name="role" placeholder="Rôle" required />
      <button type="submit">Créer</button>
    </form>
    <ul>
      <li *ngFor="let compte of comptes">
        {{ compte.nom }} ({{ compte.email }}) - {{ compte.role }}
        <button (click)="supprimerCompte(compte.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!comptes.length">Aucun compte utilisateur.</p>
  `,
  styleUrls: []
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
} 