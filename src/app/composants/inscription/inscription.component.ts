import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  email: string = '';
  motDePasse: string = '';
  confirmationMotDePasse: string = '';
  messageErreur: string = '';
  chargement: boolean = false;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  async soumettre() {
    // Réinitialiser le message d'erreur
    this.messageErreur = '';

    // Validation
    if (!this.email || !this.motDePasse || !this.confirmationMotDePasse) {
      this.messageErreur = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.motDePasse !== this.confirmationMotDePasse) {
      this.messageErreur = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (this.motDePasse.length < 6) {
      this.messageErreur = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.chargement = true;

    try {
      await this.authService.inscription(this.email, this.motDePasse);
      this.notificationService.afficherSucces('Inscription réussie !');
      setTimeout(() => {
        this.router.navigate(['/connexion']);
      }, 1000);
    } catch (erreur: any) {
      console.error('Erreur lors de l\'inscription:', erreur);
      
      if (erreur.code === 'auth/email-already-in-use') {
        this.messageErreur = 'Cette adresse e-mail est déjà utilisée';
      } else if (erreur.code === 'auth/invalid-email') {
        this.messageErreur = 'Adresse e-mail invalide';
      } else if (erreur.code === 'auth/weak-password') {
        this.messageErreur = 'Le mot de passe est trop faible';
      } else {
        this.messageErreur = 'Une erreur est survenue lors de l\'inscription';
      }
    } finally {
      this.chargement = false;
    }
  }
}