import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Profil de compétences</h2>
    <p *ngIf="employe; else loading">
      Nom : {{ employe.nom }}<br>
      Email : {{ employe.email }}<br>
      Poste : {{ employe.poste }}
    </p>
    <ng-template #loading>
      <p>Chargement ou utilisateur introuvable...</p>
    </ng-template>
  `
})
export class UserProfilComponent implements OnInit {
  employe: any;

  constructor(
    private route: ActivatedRoute,
    private userService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.userService.getEmployeById(id).subscribe({
        next: emp => this.employe = emp,
        error: err => {
          console.error('Erreur :', err);
          this.employe = null;
        }
      });
    }
  }
}
