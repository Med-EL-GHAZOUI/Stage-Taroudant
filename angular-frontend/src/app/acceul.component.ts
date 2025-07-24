import { Component } from '@angular/core';
import { LoginComponent } from './Connexion/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [LoginComponent, CommonModule, RouterModule],
  template: `<app-login></app-login>`
})
export class AccuelComponent {} 