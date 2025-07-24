import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connecter',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule ],
  template: `
  <div class="gpec-container">
  <header class="gpec-header">
    <h1>Connexion</h1>
    <p class="subtitle">Accédez à votre espace GPEC</p>
  </header>
  
  <main class="gpec-main">
    <form (ngSubmit)="login()" class="login-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input id="username" name="username" [(ngModel)]="loginData.username" required autocomplete="username" />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" name="password" [(ngModel)]="loginData.password" type="password" required autocomplete="current-password" />
      </div>
      <button type="submit" class="login-btn">Se connecter</button>
      
      <div *ngIf="error" class="error-message">{{ error }}</div>
      
      <div class="form-links">
        <a routerLink="/register">Créer un compte</a>
        <a routerLink="/forgot-password">Mot de passe oublié ?</a>
        <a routerLink="/contact">Besoin d'aide ?</a>
      </div>
    </form>
  </main>
  
  <footer class="gpec-footer">
    <p>© {{ currentYear }} Système GPEC - Tous droits réservés | Conforme RGPD</p>
  </footer>
</div>

<style>
  .gpec-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .gpec-header {
    text-align: center;
    padding: 2rem 0;
  }
  
  .gpec-header h1 {
    margin: 0;
    font-size: 2rem;
    color: #0066cc;
  }
  
  .subtitle {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 1.1rem;
  }
  
  .gpec-main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 2rem;
    background-color: #f8f9fa;
  }
  
  .login-form {
    background: #fff;
    padding: 2rem 2.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    width: 100%;
    max-width: 400px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0,102,204,0.2);
  }
  
  .login-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;
  }
  
  .login-btn:hover {
    background-color: #0052a3;
  }
  
  .login-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #d32f2f;
    margin: 1rem 0;
    text-align: center;
    font-size: 0.9rem;
  }
  
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
  
  .gpec-footer {
    text-align: center;
    padding: 1.5rem;
    background-color: #f5f5f5;
    font-size: 0.9rem;
    color: #666;
  }
</style>
`
})
export class ConnecterComponent {
  loginData = {
    username: '',
    password: ''
  };
  error: string | null = null;
  currentYear = new Date().getFullYear();

  login() {
    console.log(this.loginData);
    // Ajoute ici la logique d'authentification
  }
}
