import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Formation } from './formation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Formation])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
// This module defines the UsersModule which provides the UsersService.
// The UsersService is responsible for user management, including user validation and retrieval.