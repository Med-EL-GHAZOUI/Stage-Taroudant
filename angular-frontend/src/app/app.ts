import { Component } from '@angular/core';
import { LoginComponent } from './Connexion/login.component'; // adapte le chemin selon ton projet
//import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './Accueil/accueil.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccueilComponent],
  template: `<app-accueil></app-accueil>`,
  styleUrls: ['./login.component.css']
})
export class App {}
export interface App {
  title: string;
  description: string;
}

