import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './Accueil/accueil.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule, AccueilComponent],
  template: `<app-accueil></app-accueil>`
})
export class AppComponent {}

