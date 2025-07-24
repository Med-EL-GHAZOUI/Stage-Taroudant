import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  template : `
  <div class="login-container">
  <div class="login-card">
    <header class="login-header">
      <img src="./assets/images/img2.png" alt="Logo de l'entreprise" class="logo">
      <h1>Connexion à votre compte</h1>
      <p class="subtitle">Gestion Prévisionnelle des Emplois et Compétences</p>
    </header>

    <form (ngSubmit)="onSubmit()" class="login-form">
      <div class="form-group">
        <label for="email">Adresse email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          [(ngModel)]="loginData.email"
          placeholder="votre@email.com"
          required
          [disabled]="isLoading"
          autocomplete="email">
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          [(ngModel)]="loginData.password"
          placeholder="••••••••"
          required
          [disabled]="isLoading"
          autocomplete="current-password">
      </div>

      <button type="submit" class="submit-btn" [disabled]="isLoading">
        <span *ngIf="!isLoading">Se connecter</span>
      </button>

      <div *ngIf="errorMessage" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ errorMessage }}</span>
      </div>
 
       <div class="form-links">
        <a routerLink="/register">Créer un compte</a>
        <a routerLink="/forgot-password">Mot de passe oublié ?</a>
        <a routerLink="/contact">Besoin d'aide ?</a>
      </div>
    </form>
  </div>

  <footer class="login-footer">
    <p>© {{ currentYear }} GPEC Entreprise. Tous droits réservés.</p>
    <div class="footer-links">
      <a routerLink="/privacy">Confidentialité</a>
      <a routerLink="/terms">Conditions d'utilisation</a>
      <a routerLink="/contact">Contact</a>
    </div>
  </footer>
</div> 
  `,
  styles: [`
  /* Import Font Awesome pour les icônes */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  .form-links {
    margin-top: 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .form-links a {
    color: #0066cc;
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  .form-links a:hover {
    text-decoration: underline;
  }
  /* Variables CSS */
  :host {
    --primary-color: #3498db;
    --primary-dark: #2980b9;
    --error-color: #e74c3c;
    --background-color: #f8f9fa;
    --background-light: #f1f3f5;
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    --border-color: #dfe6e9;
    --border-radius: 8px;
    --box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .login-card {
    width: 100%;
    max-width: 450px;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 2.5rem;
    margin-bottom: 2rem;
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 1.8rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-size: 0.9rem;
        color: var(--text-primary);
        font-weight: 500;
      }

      input {
        padding: 0.9rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
        transition: var(--transition);

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        &:disabled {
          background-color: var(--background-light);
          cursor: not-allowed;
        }
      }
    }
  }

  .submit-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 48px;

    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: var(--error-color);
    background-color: rgba(231, 76, 60, 0.1);
    padding: 0.8rem 1rem;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      font-size: 1rem;
    }
  }

  .forgot-password {
    text-align: center;
    margin-top: 0.5rem;

    a {
      color: var(--text-secondary);
      font-size: 0.9rem;
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        color: var(--primary-color);
        text-decoration: underline;
      }
    }
  }

  .register-link {
    text-align: center;
    margin-top: 1.5rem;
    color: var(--text-secondary);
    font-size: 0.95rem;

    a {
      color: var(--primary-color);
      font-weight: 500;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .login-footer {
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.85rem;

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 0.5rem;

      a {
        color: var(--text-secondary);
        text-decoration: none;

        &:hover {
          color: var(--primary-color);
          text-decoration: underline;
        }
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 600px) {
    .login-container {
      padding: 1rem;
    }

    .login-card {
      padding: 1.5rem;
    }
  }

  /* Animation du spinner */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
`],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  
  errorMessage = '';
  currentYear: number = new Date().getFullYear();
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit() {
    if (!this.isFormValid()) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error)
    });
  }

  private isFormValid(): boolean {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return false;
    }
    return true;
  }

  private handleLoginSuccess(response: any): void {
    this.authService.saveToken(response.access_token, response.user.role);
    this.navigateBasedOnRole(response.user.role);
    this.isLoading = false;
  }

  private handleLoginError(error: any): void {
    this.isLoading = false;
    
    switch (error.status) {
      case 401:
        this.errorMessage = 'Email ou mot de passe incorrect';
        break;
      case 0:
        this.errorMessage = 'Connexion au serveur impossible. Vérifiez votre connexion internet.';
        break;
      default:
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    }
  }

  private navigateBasedOnRole(role: string): void {
    const routes: Record<string, string> = {
      'admin': '/admin/dashboard',
      'rh': '/rh/employees',
      'manager': '/manager/team',
      'employee': '/employee/profile',
      'guest': '/guest/dashboard'
    };

    this.router.navigate([routes[role] || '/']);
  }
}