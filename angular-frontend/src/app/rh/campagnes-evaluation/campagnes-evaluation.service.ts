import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CampagneEvaluation {
  id: number;
  titre: string;
  dateDebut: string;
  dateFin: string;
  objectifs: string[];
}

@Injectable({ providedIn: 'root' })
export class CampagnesEvaluationService {
  constructor(private http: HttpClient) {}

  getCampagnes(): Observable<CampagneEvaluation[]> {
    return this.http.get<CampagneEvaluation[]>('/api/rh/campagnes-evaluation');
  }

  creerCampagne(campagne: Partial<CampagneEvaluation>): Observable<CampagneEvaluation> {
    return this.http.post<CampagneEvaluation>('/api/rh/campagnes-evaluation', campagne);
  }

  supprimerCampagne(id: number): Observable<void> {
    return this.http.delete<void>(`/api/rh/campagnes-evaluation/${id}`);
  }
} 