import { Module } from '@nestjs/common';
import { RhController } from './rh.controller';
 
@Module({
  controllers: [RhController],
})
export class RhModule {} 