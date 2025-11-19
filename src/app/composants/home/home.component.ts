import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  async seDeconnecter() {
    try {
      await this.authService.deconnexion();
      setTimeout(() => {
        this.router.navigate(['/connexion']);
      }, 1000);
    } catch (erreur) {
      console.error('Erreur lors de la déconnexion:', erreur);
      this.notificationService.afficherErreur('Une erreur est survenue lors de la déconnexion');
    }
  }
}