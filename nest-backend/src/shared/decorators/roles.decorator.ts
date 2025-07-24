// roles.decorator.ts - Fichier généré automatiquement
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);