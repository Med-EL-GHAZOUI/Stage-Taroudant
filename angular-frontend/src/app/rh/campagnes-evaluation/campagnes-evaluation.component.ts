import { Component } from '@angular/core';
import { CampagnesEvaluationService, CampagneEvaluation } from './campagnes-evaluation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campagnes-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gestion des campagnes d'évaluation</h2>
    <form (ngSubmit)="creerCampagne()">
      <input [(ngModel)]="nouvelle.titre" name="titre" placeholder="Titre" required />
      <input [(ngModel)]="nouvelle.dateDebut" name="dateDebut" placeholder="Date début" required />
      <input [(ngModel)]="nouvelle.dateFin" name="dateFin" placeholder="Date fin" required />
      <input [(ngModel)]="nouvelObjectif" name="objectif" placeholder="Objectif" />
      <button type="button" (click)="ajouterObjectif()">Ajouter objectif</button>
      <ul>
        <li *ngFor="let o of nouvelle.objectifs">{{ o }}</li>
      </ul>
      <button type="submit">Créer</button>
    </form>
    <ul>
      <li *ngFor="let campagne of campagnes">
        <strong>{{ campagne.titre }}</strong> ({{ campagne.dateDebut }} - {{ campagne.dateFin }})<br>
        Objectifs : {{ campagne.objectifs.join(', ') }}
        <button (click)="supprimerCampagne(campagne.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!campagnes.length">Aucune campagne d'évaluation.</p>
  `,
  styleUrls: []
})
export class RhCampagnesEvaluationComponent {
  campagnes: CampagneEvaluation[] = [];
  nouvelle: Partial<CampagneEvaluation> = { titre: '', dateDebut: '', dateFin: '', objectifs: [] };
  nouvelObjectif = '';

  constructor(private campagnesService: CampagnesEvaluationService) {
    this.chargerCampagnes();
  }

  chargerCampagnes() {
    this.campagnesService.getCampagnes().subscribe(list => this.campagnes = list);
  }

  creerCampagne() {
    if (this.nouvelle.titre && this.nouvelle.dateDebut && this.nouvelle.dateFin) {
      this.campagnesService.creerCampagne(this.nouvelle).subscribe(() => {
        this.nouvelle = { titre: '', dateDebut: '', dateFin: '', objectifs: [] };
        this.nouvelObjectif = '';
        this.chargerCampagnes();
      });
    }
  }

  ajouterObjectif() {
    if (this.nouvelObjectif) {
      if (!this.nouvelle.objectifs) this.nouvelle.objectifs = [];
      this.nouvelle.objectifs.push(this.nouvelObjectif);
      this.nouvelObjectif = '';
    }
  }

  supprimerCampagne(id: number) {
    this.campagnesService.supprimerCampagne(id).subscribe(() => this.chargerCampagnes());
  }
} 