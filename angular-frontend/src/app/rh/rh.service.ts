import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// rh.service.ts
@Injectable({
  providedIn: 'root'
})
export class RhService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRapports() {
    return this.http.get(`${this.API_URL}/rh/rapports`);
  }

  getFichesPostes() {
    return this.http.get(`${this.API_URL}/rh/fiches-postes`);
  }

  lancerCampagne(data: any) {
    return this.http.post(`${this.API_URL}/rh/campagnes`, data);
  }
}
