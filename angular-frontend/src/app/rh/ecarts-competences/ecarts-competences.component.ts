import { Component } from '@angular/core';
import { EcartsCompetencesService, EcartCompetence } from './ecarts-competences.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ecarts-competences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Écarts de compétences</h2>
    <form (ngSubmit)="creerEcart()">
      <input [(ngModel)]="nouvelEcart.employeId" name="employeId" type="number" placeholder="ID employé" required />
      <input [(ngModel)]="nouvelEcart.competence" name="competence" placeholder="Compétence" required />
      <input [(ngModel)]="nouvelEcart.niveauActuel" name="niveauActuel" type="number" placeholder="Niveau actuel" required />
      <input [(ngModel)]="nouvelEcart.niveauRequis" name="niveauRequis" type="number" placeholder="Niveau requis" required />
      <input [(ngModel)]="nouvelEcart.suggestionFormation" name="suggestionFormation" placeholder="Suggestion formation" />
      <button type="submit">Ajouter</button>
    </form>
    <ul>
      <li *ngFor="let e of ecarts">
        Employé {{ e.employeId }} : {{ e.competence }} ({{ e.niveauActuel }}/{{ e.niveauRequis }})
        <span *ngIf="e.suggestionFormation">- Formation suggérée : {{ e.suggestionFormation }}</span>
        <button (click)="supprimerEcart(e.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!ecarts.length">Aucun écart de compétence.</p>
  `,
  styleUrls: []
})
export class RhEcartsCompetencesComponent {
  ecarts: EcartCompetence[] = [];
  nouvelEcart: Partial<EcartCompetence> = { employeId: undefined, competence: '', niveauActuel: undefined, niveauRequis: undefined, suggestionFormation: '' };

  constructor(private ecartsService: EcartsCompetencesService) {
    this.chargerEcarts();
  }

  chargerEcarts() {
    this.ecartsService.getEcarts().subscribe(list => this.ecarts = list);
  }

  creerEcart() {
    if (this.nouvelEcart.employeId && this.nouvelEcart.competence && this.nouvelEcart.niveauActuel !== undefined && this.nouvelEcart.niveauRequis !== undefined) {
      this.ecartsService.creerEcart(this.nouvelEcart).subscribe(() => {
        this.nouvelEcart = { employeId: undefined, competence: '', niveauActuel: undefined, niveauRequis: undefined, suggestionFormation: '' };
        this.chargerEcarts();
      });
    }
  }

  supprimerEcart(id: number) {
    this.ecartsService.supprimerEcart(id).subscribe(() => this.chargerEcarts());
  }
} 