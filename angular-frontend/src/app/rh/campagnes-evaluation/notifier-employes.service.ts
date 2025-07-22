import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotificationCampagne {
  id: number;
  campagneId: number;
  employeId: number;
  message: string;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class NotifierEmployesService {
  constructor(private http: HttpClient) {}

  getNotifications(campagneId: number): Observable<NotificationCampagne[]> {
    return this.http.get<NotificationCampagne[]>(`/api/rh/campagnes-evaluation/${campagneId}/notifications`);
  }

  notifierEmploye(notification: Partial<NotificationCampagne>): Observable<NotificationCampagne> {
    return this.http.post<NotificationCampagne>('/api/rh/campagnes-evaluation/notifier-employes', notification);
  }

  supprimerNotification(id: number): Observable<void> {
    return this.http.delete<void>(`/api/rh/campagnes-evaluation/notifier-employes/${id}`);
  }
} 