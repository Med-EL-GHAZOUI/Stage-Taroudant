import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FichePoste {
  id: number;
  titre: string;
  description: string;
  competences: string[];
}

@Injectable({ providedIn: 'root' })
export class FichesPosteService {
  constructor(private http: HttpClient) {}

  getFiches(): Observable<FichePoste[]> {
    return this.http.get<FichePoste[]>('/api/rh/fiches-poste');
  }

  creerFiche(fiche: Partial<FichePoste>): Observable<FichePoste> {
    return this.http.post<FichePoste>('/api/rh/fiches-poste', fiche);
  }

  supprimerFiche(id: number): Observable<void> {
    return this.http.delete<void>(`/api/rh/fiches-poste/${id}`);
  }
} 