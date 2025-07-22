import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompteUtilisateur {
  id: number;
  nom: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class ComptesUtilisateursService {
  constructor(private http: HttpClient) {}

  getComptes(): Observable<CompteUtilisateur[]> {
    return this.http.get<CompteUtilisateur[]>('/api/admin/comptes-utilisateurs');
  }

  creerCompte(compte: Partial<CompteUtilisateur>): Observable<CompteUtilisateur> {
    return this.http.post<CompteUtilisateur>('/api/admin/comptes-utilisateurs', compte);
  }

  supprimerCompte(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/comptes-utilisateurs/${id}`);
  }
} 