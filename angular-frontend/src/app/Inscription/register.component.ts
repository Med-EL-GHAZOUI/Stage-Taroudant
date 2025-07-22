import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
    confirmPassword: '',
    role: ''
  };

  error: string | null = null;
  success: string | null = null;
  currentYear = new Date().getFullYear();

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      this.success = null;
    } else if (!this.registerData.role) {
      this.error = "Veuillez choisir un rôle.";
      this.success = null;
    } else {
      this.error = null;
      this.success = null;
      this.authService.register(this.registerData).subscribe({
        next: (res) => {
          this.success = "Compte créé avec succès.";
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (err) => {
          this.error = err.error?.message || "Erreur lors de l'inscription.";
        }
      });
    }
  }
}
