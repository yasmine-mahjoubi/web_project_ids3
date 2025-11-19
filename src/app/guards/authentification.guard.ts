import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

export const authentificationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.estConnecte()) {
    return true;
  } else {
    // Rediriger vers la page de connexion si non connecté
    router.navigate(['/connexion']);
    return false;
  }
};