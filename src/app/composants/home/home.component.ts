import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

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
    private router: Router
  ) {}

  async seDeconnecter() {
    try {
      await this.authService.deconnexion();
      alert('Déconnexion réussie');
      this.router.navigate(['/connexion']);
    } catch (erreur) {
      console.error('Erreur lors de la déconnexion:', erreur);
    }
  }
}