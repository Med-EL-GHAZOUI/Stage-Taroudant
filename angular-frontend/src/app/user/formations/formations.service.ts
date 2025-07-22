import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class FormationsService {
  constructor(private http: HttpClient) {}

  getFormations(): Observable<any> {
    return this.http.get<any>('/api/formations');
  }
} 