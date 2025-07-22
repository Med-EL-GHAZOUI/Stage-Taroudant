import { Component } from '@angular/core';
import { CompetencesEquipeService, CompetenceEquipe } from './competences-equipe.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-competences-equipe',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Compétences de l'équipe</h2>
<ul>
  <li *ngFor="let membre of equipe">
    <strong>{{ membre.nom }}</strong> : {{ membre.competences.join(', ') }}
  </li>
</ul>
<p *ngIf="!equipe.length">Aucune compétence trouvée pour l'équipe.</p>`
})
export class ManagerCompetencesEquipeComponent {
  equipe: CompetenceEquipe[] = [];
  constructor(private competencesService: CompetencesEquipeService, private route: ActivatedRoute) {
    const managerId = this.route.snapshot.paramMap.get('id');
    if (managerId) {
      this.competencesService.getCompetencesEquipe(+managerId).subscribe(list => this.equipe = list);
    }
  }
} 