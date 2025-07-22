import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World salam!';
    // return 'Hello World !'; // Original line before modification
  }
}