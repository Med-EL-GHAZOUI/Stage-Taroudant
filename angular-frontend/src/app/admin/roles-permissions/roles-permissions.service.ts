import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RolePermission {
  id: number;
  role: string;
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class RolesPermissionsService {
  constructor(private http: HttpClient) {}

  getRolesPermissions(): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>('/api/admin/roles-permissions');
  }

  creerRolePermission(rolePerm: Partial<RolePermission>): Observable<RolePermission> {
    return this.http.post<RolePermission>('/api/admin/roles-permissions', rolePerm);
  }

  supprimerRolePermission(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/roles-permissions/${id}`);
  }
} 