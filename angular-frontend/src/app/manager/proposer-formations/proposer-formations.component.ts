import { Component } from '@angular/core';
import { ProposerFormationsService, FormationProposee } from './proposer-formations.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-proposer-formations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Formations proposées</h2>
    <form (ngSubmit)="proposerFormation()">
      <input [(ngModel)]="nouvelle.titre" name="titre" placeholder="Titre" required />
      <input [(ngModel)]="nouvelle.description" name="description" placeholder="Description" required />
      <button type="submit">Proposer</button>
    </form>
    <ul>
      <li *ngFor="let f of formations">
        <strong>{{ f.titre }}</strong> ({{ f.date }})<br>
        {{ f.description }}
        <button (click)="supprimerFormation(f.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!formations.length">Aucune formation proposée.</p>
  `,
  styleUrls: []
})
export class ManagerProposerFormationsComponent {
  formations: FormationProposee[] = [];
  nouvelle: Partial<FormationProposee> = { titre: '', description: '' };
  managerId: number | undefined = undefined;

  constructor(private proposerService: ProposerFormationsService, private auth: AuthService) {
    const user = this.auth.getUserFromToken();
    this.managerId = user?.id ?? undefined;
    if (this.managerId) {
      this.chargerFormations();
    }
  }

  chargerFormations() {
    if (this.managerId) {
      this.proposerService.getFormationsProposees(this.managerId).subscribe(list => this.formations = list);
    }
  }

  proposerFormation() {
    if (this.managerId && this.nouvelle.titre && this.nouvelle.description) {
      const formation = {
        ...this.nouvelle,
        managerId: this.managerId,
        date: new Date().toISOString().slice(0, 10)
      };
      this.proposerService.proposerFormation(formation).subscribe(() => {
        this.nouvelle = { titre: '', description: '' };
        this.chargerFormations();
      });
    }
  }

  supprimerFormation(id: number) {
    this.proposerService.supprimerFormation(id).subscribe(() => this.chargerFormations());
  }
} 