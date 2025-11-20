import { Routes } from '@angular/router';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { HomeComponent } from './composants/patient/home.component';
import { DashboardAdminComponent } from './composants/admin/dashboard-admin/dashboard-admin.component';
import { patientGuard } from './guards/patient.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { 
    path: 'patient/home', 
    component: HomeComponent,
    canActivate: [patientGuard]
  },
  { 
    path: 'admin/dashboard', 
    component: DashboardAdminComponent,
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '/connexion' }
];