// employee.controller.ts - Fichier généré automatiquement
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('employee')
@UseGuards(RolesGuard)
@Roles(Role.EMPLOYE)
export class EmployeeController {
  @Get('profile')
  getProfile() {
    return 'Profil de compétences de l’employé';
  }

  @Get('formations')
  getFormations() {
    return 'Formations disponibles';
  }
}