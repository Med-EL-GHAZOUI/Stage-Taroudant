// src/main.server.ts
import 'zone.js'; // ⬅️ ضروري يكون هنا أيضاً

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

export function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withFetch()),
      provideRouter(routes)
    ]
  });
}

export default bootstrap;
