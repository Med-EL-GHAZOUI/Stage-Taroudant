import { Controller, Get, Post, Body } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
export class AdminController {
  @Roles('admin')
  @Post('referentiels')
  configurerReferentiels(@Body() body: any) {
    return { message: 'Référentiels configurés', data: body };
  }

  @Roles('admin')
  @Post('roles-permissions')
  gererRolesPermissions(@Body() body: any) {
    return { message: 'Rôles et permissions gérés', data: body };
  }

  @Roles('admin')
  @Post('roles-permissions/associer-competence')
  associerCompetence(@Body() body: any) {
    return { message: 'Compétence associée', data: body };
  }

  @Roles('admin')
  @Post('comptes-utilisateurs')
  gererComptesUtilisateurs(@Body() body: any) {
    return { message: 'Compte utilisateur géré', data: body };
  }
} 