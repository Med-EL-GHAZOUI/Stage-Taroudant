import { Component } from '@angular/core';

import { FormationsService } from './formations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Formations disponibles</h2>
<ul>
  <li *ngFor="let formation of formations">
    {{ formation.titre }} ({{ formation.date }})<br>
    {{ formation.description }}
  </li>
</ul>
<p *ngIf="!formations.length">Aucune formation disponible.</p>`
})
export class UserFormationsComponent {
  formations: any[] = [];
  constructor(private formationsService: FormationsService) {
    this.formationsService.getFormations().subscribe(list => this.formations = list);
  }
} 