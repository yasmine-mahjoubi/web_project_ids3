import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

export const patientGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (!authService.estConnecte()) {
    router.navigate(['/home']);
    return false;
  }

  const role = await authService.obtenirRole();
  
  if (role === 'patient') {
    return true;
  } else {
    router.navigate(['/admin/dashboard']);
    return false;
  }
};