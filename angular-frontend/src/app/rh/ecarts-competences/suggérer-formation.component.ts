import { Component, Input } from '@angular/core';
import { SuggérerFormationService, SuggestionFormation } from './suggérer-formation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggérer-formation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3>Suggestions de formation</h3>
    <form (ngSubmit)="creerSuggestion()">
      <input [(ngModel)]="nouvelle.formation" name="formation" placeholder="Formation" required />
      <input [(ngModel)]="nouvelle.commentaire" name="commentaire" placeholder="Commentaire" />
      <button type="submit">Suggérer</button>
    </form>
    <ul>
      <li *ngFor="let s of suggestions">
        {{ s.formation }}<span *ngIf="s.commentaire"> - {{ s.commentaire }}</span>
        <button (click)="supprimerSuggestion(s.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!suggestions.length">Aucune suggestion.</p>
  `,
  styleUrls: []
})
export class RhSuggérerFormationComponent {
  @Input() ecartId: number | undefined = undefined;
  suggestions: SuggestionFormation[] = [];
  nouvelle: Partial<SuggestionFormation> = { formation: '', commentaire: '' };

  constructor(private suggService: SuggérerFormationService) {}

  ngOnInit() {
    if (this.ecartId) {
      this.chargerSuggestions();
    }
  }

  chargerSuggestions() {
    if (this.ecartId) {
      this.suggService.getSuggestions(this.ecartId).subscribe(list => this.suggestions = list);
    }
  }

  creerSuggestion() {
    if (this.ecartId && this.nouvelle.formation) {
      const suggestion = {
        ...this.nouvelle,
        ecartId: this.ecartId
      };
      this.suggService.creerSuggestion(suggestion).subscribe(() => {
        this.nouvelle = { formation: '', commentaire: '' };
        this.chargerSuggestions();
      });
    }
  }

  supprimerSuggestion(id: number) {
    this.suggService.supprimerSuggestion(id).subscribe(() => this.chargerSuggestions());
  }
} 