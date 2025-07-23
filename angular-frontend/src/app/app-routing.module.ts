import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './role.guard';
import { ConnexionComponent } from './Connexion/login.component';
import { AccueilComponent } from './Accueil/accueil.component';
import { AccuelComponent } from './acceul.component';

const routes: Routes = [
  { path: '', component: AccuelComponent },
  { path: 'login', component: ConnexionComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'rh',
    loadChildren: () => import('./rh/rh-module').then(m => m.RhModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'rh' }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user-module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
