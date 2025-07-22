import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormationProposee {
  id: number;
  managerId: number;
  titre: string;
  description: string;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class ProposerFormationsService {
  constructor(private http: HttpClient) {}

  getFormationsProposees(managerId: number): Observable<FormationProposee[]> {
    return this.http.get<FormationProposee[]>(`/api/manager/proposer-formations/${managerId}`);
  }

  proposerFormation(formation: Partial<FormationProposee>): Observable<FormationProposee> {
    return this.http.post<FormationProposee>('/api/manager/proposer-formations', formation);
  }

  supprimerFormation(id: number): Observable<void> {
    return this.http.delete<void>(`/api/manager/proposer-formations/${id}`);
  }
} 