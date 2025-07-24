import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink]
})
export class ForgotPasswordComponent {
  resetData = {
    email: ''
    
  };


error: string = '';
success: string = '';
currentYear: number = new Date().getFullYear();

  resetPassword() {
    if (!this.resetData.email) {
      this.error = 'Veuillez entrer un email.';
      this.success = '';
      return;
    }

    // Simulation
    this.success = 'Lien de réinitialisation envoyé.';
    this.error = '';
  }
}
