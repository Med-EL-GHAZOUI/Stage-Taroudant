// manager.controller.ts - Fichier généré automatiquement
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('manager')
@UseGuards(RolesGuard)
@Roles(Role.MANAGER)
export class ManagerController {
  @Get('equipe')
  getEquipe() {
    return 'Compétences de l’équipe';
  }
}