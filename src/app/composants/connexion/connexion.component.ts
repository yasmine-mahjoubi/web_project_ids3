import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  email: string = '';
  motDePasse: string = '';
  messageErreur: string = '';
  chargement: boolean = false;

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  async soumettre() {
    // Réinitialiser le message d'erreur
    this.messageErreur = '';

    // Validation
    if (!this.email || !this.motDePasse) {
      this.messageErreur = 'Veuillez remplir tous les champs';
      return;
    }

    this.chargement = true;

    try {
      await this.authService.connexion(this.email, this.motDePasse);
      alert('Connexion réussie !');
      this.router.navigate(['/cliniques']); // Redirection vers la liste des cliniques
    } catch (erreur: any) {
      console.error('Erreur lors de la connexion:', erreur);
      
      if (erreur.code === 'auth/user-not-found') {
        this.messageErreur = 'Aucun compte n\'existe avec cette adresse e-mail';
      } else if (erreur.code === 'auth/wrong-password') {
        this.messageErreur = 'Mot de passe incorrect';
      } else if (erreur.code === 'auth/invalid-email') {
        this.messageErreur = 'Adresse e-mail invalide';
      } else if (erreur.code === 'auth/invalid-credential') {
        this.messageErreur = 'Email ou mot de passe incorrect';
      } else {
        this.messageErreur = 'Une erreur est survenue lors de la connexion';
      }
    } finally {
      this.chargement = false;
    }
  }
}