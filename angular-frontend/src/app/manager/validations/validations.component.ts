import { Component } from '@angular/core';
import { ValidationsService, ValidationEvaluation } from './validations.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-validations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Validations des évaluations</h2>
    <form (ngSubmit)="validerEvaluation()">
      <input [(ngModel)]="nouvelle.collaborateurId" name="collaborateurId" type="number" placeholder="ID collaborateur" required />
      <input [(ngModel)]="nouvelle.commentaire" name="commentaire" placeholder="Commentaire" required />
      <input [(ngModel)]="nouvelle.notePerformance" name="notePerformance" type="number" min="0" max="20" placeholder="Note performance" required />
      <button type="submit">Valider</button>
    </form>
    <ul>
      <li *ngFor="let v of validations">
        {{ v.date }} : Collaborateur {{ v.collaborateurId }} - {{ v.commentaire }} ({{ v.notePerformance }}/20)
        <button (click)="supprimerValidation(v.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!validations.length">Aucune validation.</p>
  `,
  styleUrls: []
})
export class ManagerValidationsComponent {
  validations: ValidationEvaluation[] = [];
  nouvelle: Partial<ValidationEvaluation> = { collaborateurId: undefined, commentaire: '', notePerformance: undefined };
  managerId: number | undefined = undefined;

  constructor(private validationsService: ValidationsService, private auth: AuthService) {
    const user = this.auth.getUserFromToken();
    this.managerId = user?.id ?? undefined;
    if (this.managerId) {
      this.chargerValidations();
    }
  }

  chargerValidations() {
    if (this.managerId) {
      this.validationsService.getValidations(this.managerId).subscribe(list => this.validations = list);
    }
  }

  validerEvaluation() {
    if (this.managerId && this.nouvelle.collaborateurId && this.nouvelle.commentaire && this.nouvelle.notePerformance !== undefined) {
      const validation = {
        ...this.nouvelle,
        managerId: this.managerId,
        date: new Date().toISOString().slice(0, 10)
      };
      this.validationsService.validerEvaluation(validation).subscribe(() => {
        this.nouvelle = { collaborateurId: undefined, commentaire: '', notePerformance: undefined };
        this.chargerValidations();
      });
    }
  }

  supprimerValidation(id: number) {
    this.validationsService.supprimerValidation(id).subscribe(() => this.chargerValidations());
  }
} 