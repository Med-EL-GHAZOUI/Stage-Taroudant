import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompetenceEquipe {
  employeId: number;
  nom: string;
  competences: string[];
}

@Injectable({ providedIn: 'root' })
export class CompetencesEquipeService {
  constructor(private http: HttpClient) {}

  getCompetencesEquipe(managerId: number): Observable<CompetenceEquipe[]> {
    return this.http.get<CompetenceEquipe[]>(`/api/manager/competences-equipe/${managerId}`);
  }
} 