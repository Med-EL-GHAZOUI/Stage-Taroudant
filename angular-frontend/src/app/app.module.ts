import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AccueilComponent } from './Accueil/accueil.component';
import { ConnexionComponent } from './Connexion/connexion.component';
import { LoginComponent } from './login.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  // declarations: [
  //   AppComponent,
  //   AccueilComponent,
  //   ConnexionComponent,
  //   LoginComponent
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([]),
    AppComponent,
    AccueilComponent,
    ConnexionComponent,
    LoginComponent
  ],
  providers: [],
})
export class AppModule {}

//HttpClientModule :
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
});
