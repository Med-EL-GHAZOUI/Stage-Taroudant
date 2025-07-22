import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('formations')
  async createFormation(@Body() body: { titre: string; description?: string }) {
    return this.usersService.createFormation(body.titre, body.description);
  }

  @Get('formations')
  async getFormations() {
    return this.usersService.getFormations();
  }

  @Post(':userId/formations/:formationId')
  async inscrireUserAFormation(@Param('userId') userId: number, @Param('formationId') formationId: number) {
    return this.usersService.inscrireUserAFormation(userId, formationId);
  }
}
