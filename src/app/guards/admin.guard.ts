import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (!authService.estConnecte()) {
    router.navigate(['/connexion']);
    return false;
  }

  const role = await authService.obtenirRole();
  
  if (role === 'admin') {
    return true;
  } else {
    router.navigate(['/patient/home']);
    return false;
  }
};