import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, LoginComponent, RouterModule],
  template: `<app-login></app-login>`,
})
export class ConnexionComponent {} 