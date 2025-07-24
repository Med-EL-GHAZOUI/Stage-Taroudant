import { Module } from '@nestjs/common';
import { RhService } from './rh.service';
import { RhController } from './rh.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rh } from './rh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rh])],
  providers: [RhService],
  controllers: [RhController],
})
export class RhModule {}
