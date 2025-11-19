import { Routes } from '@angular/router';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { HomeComponent } from './composants/home/home.component';
import { authentificationGuard } from './guards/authentification.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authentificationGuard] // Route protégée
  },
  { path: '**', redirectTo: '/connexion' } // Redirection pour les routes inexistantes
];