import { Component } from '@angular/core';
import { AutoEvaluationService, AutoEvaluation } from './auto-evaluation.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Auto-évaluations</h2>
    <form (ngSubmit)="creerAutoEvaluation()">
      <input [(ngModel)]="nouvelle.commentaire" name="commentaire" placeholder="Commentaire" required />
      <input [(ngModel)]="nouvelle.note" name="note" type="number" min="0" max="20" placeholder="Note" required />
      <button type="submit">Soumettre</button>
    </form>
    <ul>
      <li *ngFor="let eval of evaluations">
        {{ eval.date }} : {{ eval.commentaire }} ({{ eval.note }}/20)
        <button (click)="supprimerAutoEvaluation(eval.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!evaluations.length">Aucune auto-évaluation.</p>
  `,
  styleUrls: []
})
export class UserAutoEvaluationComponent {
  evaluations: AutoEvaluation[] = [];
  nouvelle: Partial<AutoEvaluation> = { commentaire: '', note: undefined };
  employeId: number | null = null;

  constructor(private autoEvalService: AutoEvaluationService, private auth: AuthService) {
    const user = this.auth.getUserFromToken();
    this.employeId = user?.id ?? null;
    if (this.employeId) {
      this.chargerEvaluations();
    }
  }

  chargerEvaluations() {
    if (this.employeId) {
      this.autoEvalService.getAutoEvaluations(this.employeId).subscribe(list => this.evaluations = list);
    }
  }

  creerAutoEvaluation() {
    if (this.employeId && this.nouvelle.commentaire && this.nouvelle.note !== undefined) {
      const evaluation = {
        ...this.nouvelle,
        employeId: this.employeId,
        date: new Date().toISOString().slice(0, 10)
      };
      this.autoEvalService.creerAutoEvaluation(evaluation).subscribe(() => {
        this.nouvelle = { commentaire: '', note: undefined };
        this.chargerEvaluations();
      });
    }
  }

  supprimerAutoEvaluation(id: number) {
    this.autoEvalService.supprimerAutoEvaluation(id).subscribe(() => this.chargerEvaluations());
  }
} 