import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  motDePasse: string = '';
  messageErreur: string = '';
  chargement: boolean = false;
  montrerMotDePasse: boolean = false;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  // Fonction pour basculer la visibilité du mot de passe
  basculerVisibiliteMotDePasse(): void {
    this.montrerMotDePasse = !this.montrerMotDePasse;
  }

  async soumettre() {
    // Réinitialiser le message d'erreur
    this.messageErreur = '';

    // Validation
    if (!this.email || !this.motDePasse) {
      this.messageErreur = 'Veuillez remplir tous les champs';
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.messageErreur = 'Veuillez entrer une adresse e-mail valide';
      return;
    }

    this.chargement = true;

    try {
      await this.authService.connexion(this.email, this.motDePasse);
      
      // Redirection après un délai pour voir l'animation
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
      
    } catch (erreur: any) {
      console.error('Erreur lors de la connexion:', erreur);
      
      // Gestion des erreurs spécifiques
      if (erreur.code === 'auth/user-not-found') {
        this.messageErreur = 'Aucun compte n\'existe avec cette adresse e-mail';
      } else if (erreur.code === 'auth/wrong-password') {
        this.messageErreur = 'Mot de passe incorrect';
      } else if (erreur.code === 'auth/invalid-email') {
        this.messageErreur = 'Adresse e-mail invalide';
      } else if (erreur.code === 'auth/invalid-credential') {
        this.messageErreur = 'Email ou mot de passe incorrect';
      } else if (erreur.code === 'auth/too-many-requests') {
        this.messageErreur = 'Trop de tentatives de connexion. Veuillez réessayer plus tard.';
      } else if (erreur.code === 'auth/network-request-failed') {
        this.messageErreur = 'Erreur de connexion. Vérifiez votre connexion internet.';
      } else {
        this.messageErreur = 'Une erreur est survenue lors de la connexion';
      }
      
      // Notification d'erreur
      this.notificationService.afficherErreur(this.messageErreur);
      
    } finally {
      this.chargement = false;
    }
  }

  // Méthode pour réinitialiser le formulaire
  reinitialiserFormulaire(): void {
    this.email = '';
    this.motDePasse = '';
    this.messageErreur = '';
    this.montrerMotDePasse = false;
  }
}