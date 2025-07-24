// rh.controller.ts - Fichier généré automatiquement
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('rh')
@UseGuards(RolesGuard)
@Roles(Role.RH)
export class RhController {
  @Get('rapports')
  getRapports() {
    return 'Rapports RH';
  }
}