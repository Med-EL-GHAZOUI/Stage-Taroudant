import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EcartCompetence {
  id: number;
  employeId: number;
  competence: string;
  niveauActuel: number;
  niveauRequis: number;
  suggestionFormation?: string;
}

@Injectable({ providedIn: 'root' })
export class EcartsCompetencesService {
  constructor(private http: HttpClient) {}

  getEcarts(): Observable<EcartCompetence[]> {
    return this.http.get<EcartCompetence[]>('/api/rh/ecarts-competences');
  }

  creerEcart(ecart: Partial<EcartCompetence>): Observable<EcartCompetence> {
    return this.http.post<EcartCompetence>('/api/rh/ecarts-competences', ecart);
  }

  supprimerEcart(id: number): Observable<void> {
    return this.http.delete<void>(`/api/rh/ecarts-competences/${id}`);
  }
} 