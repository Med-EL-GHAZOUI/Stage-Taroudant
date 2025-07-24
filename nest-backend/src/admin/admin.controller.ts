// admin.controller.ts - Fichier généré automatiquement
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  @Get('referentiels')
  getReferentiels() {
    return 'Configuration des référentiels';
  }
}