import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Profil de compétences</h2>
<p *ngIf="employe as e">Nom : {{ e.nom }}<br>Email : {{ e.email }}<br>Poste : {{ e.poste }}</p>
<p *ngIf="!employe">Chargement...</p>`
})
export class UserProfilComponent {
  employe: any;
  constructor(private route: ActivatedRoute, private userService: UserService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getEmployeById(+id).subscribe(emp => this.employe = emp);
    }
  }
} 