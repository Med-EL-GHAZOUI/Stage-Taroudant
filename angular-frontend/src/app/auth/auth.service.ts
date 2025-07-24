import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface LoginResponse {
  access_token: string;
  user: {
    role: string;
    email: string;
  };
}
interface RegisterData {
  email: string;
  password: string;
}
export interface UserToken {
  id: number;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }




  

  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials);
  }
  register(registerData: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, registerData);
  }


  saveToken(token: string, role?: string) {
    localStorage.setItem('access_token', token);
    if (role) {
      localStorage.setItem('user_role', role);
    }
  }
   isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('role');
  }
  logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }


getUserFromToken(): { id: number; email: string; role: string } | null {
    if (!this.isBrowser()) return null;
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        role: payload.role
      };
    } catch (err) {
      console.error('Erreur de décodage du token :', err);
      return null;
    }
  }



   private tokenKey = 'token'; // clé dans localStorage

  // Stocker le token JWT (ex: après login)
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
 
}
