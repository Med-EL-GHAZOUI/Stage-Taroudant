import { Component } from '@angular/core';
import { RapportsService, RapportRh } from './rapports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Rapports RH</h2>
<ul>
  <li *ngFor="let rapport of rapports">
    <strong>{{ rapport.titre }}</strong> ({{ rapport.date }})<br>
    {{ rapport.contenu }}
  </li>
</ul>
<p *ngIf="!rapports.length">Aucun rapport disponible.</p>`
})
export class RhRapportsComponent {
  rapports: RapportRh[] = [];
  constructor(private rapportsService: RapportsService) {
    this.rapportsService.getRapports().subscribe(list => this.rapports = list);
  }
} 