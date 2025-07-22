import { Component } from '@angular/core';
import { FichesPosteService, FichePoste } from './fiches-poste.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fiches-poste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gestion des fiches de poste</h2>
    <form (ngSubmit)="creerFiche()">
      <input [(ngModel)]="nouvelle.titre" name="titre" placeholder="Titre" required />
      <input [(ngModel)]="nouvelle.description" name="description" placeholder="Description" required />
      <input [(ngModel)]="nouvelleCompetence" name="competence" placeholder="Compétence" />
      <button type="button" (click)="ajouterCompetence()">Ajouter compétence</button>
      <ul>
        <li *ngFor="let c of nouvelle.competences">{{ c }}</li>
      </ul>
      <button type="submit">Créer</button>
    </form>
    <ul>
      <li *ngFor="let fiche of fiches">
        <strong>{{ fiche.titre }}</strong> : {{ fiche.description }}<br>
        Compétences : {{ fiche.competences.join(', ') }}
        <button (click)="supprimerFiche(fiche.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!fiches.length">Aucune fiche de poste.</p>
  `,
  styleUrls: []
})
export class RhFichesPosteComponent {
  fiches: FichePoste[] = [];
  nouvelle: Partial<FichePoste> = { titre: '', description: '', competences: [] };
  nouvelleCompetence = '';

  constructor(private fichesService: FichesPosteService) {
    this.chargerFiches();
  }

  chargerFiches() {
    this.fichesService.getFiches().subscribe(list => this.fiches = list);
  }

  creerFiche() {
    if (this.nouvelle.titre && this.nouvelle.description) {
      this.fichesService.creerFiche(this.nouvelle).subscribe(() => {
        this.nouvelle = { titre: '', description: '', competences: [] };
        this.nouvelleCompetence = '';
        this.chargerFiches();
      });
    }
  }

  ajouterCompetence() {
    if (this.nouvelleCompetence) {
      if (!this.nouvelle.competences) this.nouvelle.competences = [];
      this.nouvelle.competences.push(this.nouvelleCompetence);
      this.nouvelleCompetence = '';
    }
  }

  supprimerFiche(id: number) {
    this.fichesService.supprimerFiche(id).subscribe(() => this.chargerFiches());
  }
} 