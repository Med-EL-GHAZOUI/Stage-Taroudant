import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: []
})
export class ContactComponent {
  nom = '';
  email = '';
  message = '';
  submitted = false;
  error = '';

  envoyer() {
    this.error = '';
    if (!this.nom || !this.email || !this.message) {
      this.error = 'Tous les champs sont obligatoires.';
      return;
    }
    // Ici, tu pourrais envoyer les données à un backend
    this.submitted = true;
    // Réinitialiser le formulaire si besoin
    this.nom = '';
    this.email = '';
    this.message = '';
  }
} 