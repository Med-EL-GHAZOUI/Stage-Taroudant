import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  registerData = {
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  error: string | null = null;
  success: string | null = null;
  currentYear = new Date().getFullYear();

  register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      this.success = null;
    } else {
      this.error = null;
      this.success = "Compte créé avec succès.";
      console.log("Données d'inscription :", this.registerData);
      // ici tu peux envoyer une requête HTTP vers ton backend
    }
  }
}
