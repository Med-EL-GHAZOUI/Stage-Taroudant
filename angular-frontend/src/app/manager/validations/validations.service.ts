import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ValidationEvaluation {
  id: number;
  collaborateurId: number;
  managerId: number;
  date: string;
  commentaire: string;
  notePerformance: number;
}

@Injectable({ providedIn: 'root' })
export class ValidationsService {
  constructor(private http: HttpClient) {}

  getValidations(managerId: number): Observable<ValidationEvaluation[]> {
    return this.http.get<ValidationEvaluation[]>(`/api/manager/validations/${managerId}`);
  }

  validerEvaluation(validation: Partial<ValidationEvaluation>): Observable<ValidationEvaluation> {
    return this.http.post<ValidationEvaluation>('/api/manager/validations', validation);
  }

  supprimerValidation(id: number): Observable<void> {
    return this.http.delete<void>(`/api/manager/validations/${id}`);
  }
} 