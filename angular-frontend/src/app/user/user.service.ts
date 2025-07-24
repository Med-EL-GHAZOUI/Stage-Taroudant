import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// rh.service.ts

export interface Employee {
  id: number;
  nom: string;
  email: string;
  poste: string;
  // ajoute d'autres champs si besoin
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.API_URL}/employee/profile`);
  }

  autoEvaluer(data: any) {
    return this.http.post(`${this.API_URL}/employee/auto-evaluation`, data);
  }

  getFormations() {
    return this.http.get(`${this.API_URL}/employee/formations`);
  }

  demanderInscription(formationId: number) {
    return this.http.post(`${this.API_URL}/employee/formations/${formationId}/inscription`, {});
  }

  getAutoEvaluation() {
    return this.http.get(`${this.API_URL}/employee/auto-evaluation`);
  }

  // <-- Ajoute cette méthode :
  getEmployeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/employees/${id}`);
  }
}
