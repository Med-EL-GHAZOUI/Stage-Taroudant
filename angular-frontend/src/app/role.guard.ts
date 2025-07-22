import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const actualRole = this.auth.getRole();

    if (actualRole && expectedRoles && expectedRoles.includes(actualRole)) return true;

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
