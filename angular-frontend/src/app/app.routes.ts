import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './role.guard';
import { provideHttpClient, withFetch } from '@angular/common/http';


// Employé
import { UserProfilComponent } from './user/profil/profil.component';
import { UserAutoEvaluationComponent } from './user/auto-evaluation/auto-evaluation.component';
import { UserFormationsComponent } from './user/formations/formations.component';
import { UserInscriptionFormationComponent } from './user/formations/inscription.component';
import { UserEvolutionCarriereComponent } from './user/evolution-carriere/evolution-carriere.component';
import { UserJustificationEvolutionComponent } from './user/evolution-carriere/justification.component';

// Manager
import { ManagerCompetencesEquipeComponent } from './manager/competences-equipe/competences-equipe.component';
import { ManagerProposerFormationsComponent } from './manager/proposer-formations/proposer-formations.component';
import { ManagerSuiviCompetencesComponent } from './manager/suivi-competences/suivi-competences.component';
import { ManagerValidationsComponent } from './manager/validations/validations.component';
import { ManagerCommentaireComponent } from './manager/validations/commentaire.component';
import { ManagerNotePerformanceComponent } from './manager/validations/note-performance.component';

// Admin
import { AdminReferentielsComponent } from './admin/referentiels/referentiels.component';
import { AdminRolesPermissionsComponent } from './admin/roles-permissions/roles-permissions.component';
import { AdminAssocierCompetenceComponent } from './admin/roles-permissions/associer-competence.component';
import { AdminComptesUtilisateursComponent } from './admin/comptes-utilisateurs/comptes-utilisateurs.component';

// RH
import { RhRapportsComponent } from './rh/rapports/rapports.component';
import { RhEcartsCompetencesComponent } from './rh/ecarts-competences/ecarts-competences.component';
import { RhSuggérerFormationComponent } from './rh/ecarts-competences/suggérer-formation.component';
import { RhFichesPosteComponent } from './rh/fiches-poste/fiches-poste.component';
import { RhAssocierCompetenceComponent } from './rh/fiches-poste/associer-competence.component';
import { RhCampagnesEvaluationComponent } from './rh/campagnes-evaluation/campagnes-evaluation.component';
import { RhDefinirObjectifsComponent } from './rh/campagnes-evaluation/definir-objectifs.component';
import { RhNotifierEmployesComponent } from './rh/campagnes-evaluation/notifier-employes.component';
import { ConnexionComponent } from './Connexion/login.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { ContactComponent } from './Contact/contact.component';
import { RegisterComponent } from './Inscription/register.component';
import { ForgotPasswordComponent } from './forgot-password.component';

import path from 'path';
import { HomeComponent } from './user/home/home.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Accueil/accueil.component';
import { AccuelComponent } from './acceul.component';
import { LoginComponent } from './login.component';
import { ConnComponent } from './log.component';
export const routes: Routes = [ 

  { path: 'register', component: RegisterComponent },
  { path: 'accueil', component: ConnComponent},
  { path: 'contact',component: ContactComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'login', component: ConnexionComponent },

  // Redirection par défaut
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  // Home 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },


  // Employé
  { path: 'user', component: UserProfilComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/home', component: HomeComponent, canActivate: [AuthGuard] },
  {path : 'user/profil' , component: UserProfilComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/profil/:id', component: UserProfilComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/auto-evaluation', component: UserAutoEvaluationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/formations', component: UserFormationsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/formations/inscription', component: UserInscriptionFormationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/evolution-carriere', component: UserEvolutionCarriereComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },
  { path: 'user/evolution-carriere/justification', component: UserJustificationEvolutionComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'employee'] } },

 
  // Manager
  { path: 'manager', component: ManagerCompetencesEquipeComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },
  
  { path: 'manager/competences-equipe', component: ManagerCompetencesEquipeComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },
  { path: 'manager/proposer-formations', component: ManagerProposerFormationsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },
  { path: 'manager/suivi-competences', component: ManagerSuiviCompetencesComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },
  { path: 'manager/validations', component: ManagerValidationsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },
  { path: 'manager/validations/commentaire', component: ManagerCommentaireComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },
  { path: 'manager/validations/note-performance', component: ManagerNotePerformanceComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['manager'] } },


  // Admin
  { path: 'admin', component: AdminReferentielsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/referentiels', component: AdminReferentielsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/roles-permissions', component: AdminRolesPermissionsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/roles-permissions/associer-competence', component: AdminAssocierCompetenceComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/comptes-utilisateurs', component: AdminComptesUtilisateursComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'admin/roles-permissions/associer-competence', component: AdminAssocierCompetenceComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },

  // RH
  { path: 'rh', component: RhRapportsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/rapports', component: RhRapportsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/ecarts-competences', component: RhEcartsCompetencesComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/ecarts-competences/suggérer-formation', component: RhSuggérerFormationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/fiches-poste', component: RhFichesPosteComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/fiches-poste/associer-competence', component: RhAssocierCompetenceComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/campagnes-evaluation', component: RhCampagnesEvaluationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/campagnes-evaluation/definir-objectifs', component: RhDefinirObjectifsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },
  { path: 'rh/campagnes-evaluation/notifier-employes', component: RhNotifierEmployesComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['rh'] } },

];
