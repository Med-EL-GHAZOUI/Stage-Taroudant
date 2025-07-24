import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './Accueil/accueil.component.html',
  styleUrls: ['./login.component.css']
})
export class ConnComponent {
  showForm = false;
  isMenuOpen = false;
  error = '';
  currentYear: number = new Date().getFullYear();

  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  login() {
    this.auth.login(this.loginData).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access_token, res.user.role);

        const role = res.user.role;
        switch (role) {
          case 'admin': this.router.navigate(['/admin']); break;
          case 'rh': this.router.navigate(['/rh']); break;
          case 'manager': this.router.navigate(['/manager']); break;
          case 'employee': this.router.navigate(['/employee']); break;
          case 'user': this.router.navigate(['/user']); break;
          case 'guest': this.router.navigate(['/guest']); break;
          default: this.router.navigate(['/']);
        }

        this.error = '';
      },
      error: () => {
        this.error = 'Adresse email ou mot de passe incorrect.';
      }
    });
  }
}
