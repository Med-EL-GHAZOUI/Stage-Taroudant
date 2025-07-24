// users.controller.ts - Fichier généré automatiquement
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'Liste des utilisateurs';
  }
}