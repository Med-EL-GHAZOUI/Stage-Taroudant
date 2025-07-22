import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SuggestionFormation {
  id: number;
  ecartId: number;
  formation: string;
  commentaire?: string;
}

@Injectable({ providedIn: 'root' })
export class SuggérerFormationService {
  constructor(private http: HttpClient) {}

  getSuggestions(ecartId: number): Observable<SuggestionFormation[]> {
    return this.http.get<SuggestionFormation[]>(`/api/rh/ecarts-competences/${ecartId}/suggestions`);
  }

  creerSuggestion(suggestion: Partial<SuggestionFormation>): Observable<SuggestionFormation> {
    return this.http.post<SuggestionFormation>('/api/rh/ecarts-competences/suggérer-formation', suggestion);
  }

  supprimerSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`/api/rh/ecarts-competences/suggérer-formation/${id}`);
  }
} 