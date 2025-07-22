import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin-only')
  getAdminData() {
    return { message: 'مرحبا بك أيها المشرف!' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('rh')
  @Get('rh-only')
  getRhData() {
    return { message: 'مرحبا بك مسؤول الموارد البشرية!' };
  }
}
