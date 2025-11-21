import { Routes } from '@angular/router';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { DashboardPatientComponent } from './composants/patient/dashboard-patient.component';
import { DashboardAdminComponent } from './composants/admin/dashboard-admin/dashboard-admin.component';
import { patientGuard } from './guards/patient.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { 
    path: 'patient/dashboard', 
    component: DashboardPatientComponent,
    canActivate: [patientGuard]
  },
  { 
    path: 'admin/dashboard', 
    component: DashboardAdminComponent,
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '/connexion' }
];