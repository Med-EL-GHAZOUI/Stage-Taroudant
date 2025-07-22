import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  currentYear: number = new Date().getFullYear();
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access_token);

        const role = res.user.role;
        if (role === 'admin') this.router.navigate(['/admin']);
        else if (role === 'rh') this.router.navigate(['/rh']);
        else if (role === 'manager') this.router.navigate(['/manager']);
        else if (role === 'employee') this.router.navigate(['/employee']);
        else if (role === 'guest') this.router.navigate(['/guest']);
        else if (role === 'user') this.router.navigate(['/user']);
        else if (role === 'guest') this.router.navigate(['/guest']);
        else if (role === 'user') this.router.navigate(['/user']);
        this.error = '';
      },
      error: () => {
        this.error = 'Nom d’utilisateur ou mot de passe incorrect';
      }
    });
  }
}
