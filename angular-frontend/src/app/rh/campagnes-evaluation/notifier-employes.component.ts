import { Component, Input } from '@angular/core';
import { NotifierEmployesService, NotificationCampagne } from './notifier-employes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifier-employes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3>Notifications de campagne</h3>
    <form (ngSubmit)="notifierEmploye()">
      <input [(ngModel)]="nouvelle.employeId" name="employeId" type="number" placeholder="ID employé" required />
      <input [(ngModel)]="nouvelle.message" name="message" placeholder="Message" required />
      <button type="submit">Notifier</button>
    </form>
    <ul>
      <li *ngFor="let n of notifications">
        {{ n.date }} : Employé {{ n.employeId }} - {{ n.message }}
        <button (click)="supprimerNotification(n.id)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="!notifications.length">Aucune notification.</p>
  `,
  styleUrls: []
})
export class RhNotifierEmployesComponent {
  @Input() campagneId: number | undefined = undefined;
  notifications: NotificationCampagne[] = [];
  nouvelle: Partial<NotificationCampagne> = { employeId: undefined, message: '' };

  constructor(private notifierService: NotifierEmployesService) {}

  ngOnInit() {
    if (this.campagneId) {
      this.chargerNotifications();
    }
  }

  chargerNotifications() {
    if (this.campagneId) {
      this.notifierService.getNotifications(this.campagneId).subscribe(list => this.notifications = list);
    }
  }

  notifierEmploye() {
    if (this.campagneId && this.nouvelle.employeId && this.nouvelle.message) {
      const notification = {
        ...this.nouvelle,
        campagneId: this.campagneId,
        date: new Date().toISOString().slice(0, 10)
      };
      this.notifierService.notifierEmploye(notification).subscribe(() => {
        this.nouvelle = { employeId: undefined, message: '' };
        this.chargerNotifications();
      });
    }
  }

  supprimerNotification(id: number) {
    this.notifierService.supprimerNotification(id).subscribe(() => this.chargerNotifications());
  }
} 