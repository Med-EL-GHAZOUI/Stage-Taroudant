import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RapportRh {
  id: number;
  titre: string;
  date: string;
  contenu: string;
}

@Injectable({ providedIn: 'root' })
export class RapportsService {
  constructor(private http: HttpClient) {}

  getRapports(): Observable<RapportRh[]> {
    return this.http.get<RapportRh[]>('/api/rh/rapports');
  }
} 