import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AutoEvaluation {
  id: number;
  employeId: number;
  date: string;
  commentaire: string;
  note: number;
}

@Injectable({ providedIn: 'root' })
export class AutoEvaluationService {
  constructor(private http: HttpClient) {}

  getAutoEvaluations(employeId: number): Observable<AutoEvaluation[]> {
    return this.http.get<AutoEvaluation[]>(`/api/users/auto-evaluation/${employeId}`);
  }

  creerAutoEvaluation(evaluation: Partial<AutoEvaluation>): Observable<AutoEvaluation> {
    return this.http.post<AutoEvaluation>('/api/users/auto-evaluation', evaluation);
  }

  supprimerAutoEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/auto-evaluation/${id}`);
  }
} 