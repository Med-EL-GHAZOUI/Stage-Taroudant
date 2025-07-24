// app.module.ts - Fichier généré automatiquement
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RhModule } from './rh/rh.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { EmployeeModule } from './employee/employee.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // ... tes autres modules
  ],
  
})



@Module({
  imports:[
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/nom-du-projet-angular'),
    }),
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'STAGE_COPAG',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EmployeeModule,
    ManagerModule,
    AdminModule,
    RhModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
