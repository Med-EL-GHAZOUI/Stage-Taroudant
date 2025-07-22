import { Controller, Get, Post, Body } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';

@Controller('rh')
export class RhController {
  @Roles('rh')
  @Get('rapports')
  getRapports() {
    return { message: 'Rapports RH générés' };
  }

  @Roles('rh')
  @Get('ecarts-competences')
  getEcartsCompetences() {
    return { message: 'Écarts de compétences suivis' };
  }

  @Roles('rh')
  @Post('ecarts-competences/suggérer-formation')
  suggererFormation(@Body() body: any) {
    return { message: 'Formation suggérée', data: body };
  }

  @Roles('rh')
  @Get('fiches-poste')
  getFichesPoste() {
    return { message: 'Fiches de poste gérées' };
  }

  @Roles('rh')
  @Post('fiches-poste/associer-competence')
  associerCompetence(@Body() body: any) {
    return { message: 'Compétence associée à la fiche de poste', data: body };
  }

  @Roles('rh')
  @Post('campagnes-evaluation')
  lancerCampagneEvaluation(@Body() body: any) {
    return { message: 'Campagne d’évaluation lancée', data: body };
  }

  @Roles('rh')
  @Post('campagnes-evaluation/definir-objectifs')
  definirObjectifs(@Body() body: any) {
    return { message: 'Objectifs définis', data: body };
  }

  @Roles('rh')
  @Post('campagnes-evaluation/notifier-employes')
  notifierEmployes(@Body() body: any) {
    return { message: 'Employés notifiés', data: body };
  }
} 