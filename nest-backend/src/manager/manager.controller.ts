import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';

@Controller('manager')
export class ManagerController {
  @Roles('manager')
  @Get('competences-equipe/:id')
  getCompetencesEquipe(@Param('id') id: string) {
    return { message: `Compétences de l'équipe du manager ${id}` };
  }

  @Roles('manager')
  @Post('proposer-formations')
  proposerFormations(@Body() body: any) {
    return { message: 'Formations proposées', data: body };
  }

  @Roles('manager')
  @Get('suivi-competences')
  suiviCompetences() {
    return { message: "Suivi de l’évolution des compétences de l’équipe" };
  }

  @Roles('manager')
  @Post('validations')
  validerEvaluation(@Body() body: any) {
    return { message: 'Évaluation validée', data: body };
  }

  @Roles('manager')
  @Post('validations/commentaire')
  ajouterCommentaire(@Body() body: any) {
    return { message: 'Commentaire ajouté', data: body };
  }

  @Roles('manager')
  @Post('validations/note-performance')
  noterPerformance(@Body() body: any) {
    return { message: 'Performance notée', data: body };
  }
} 