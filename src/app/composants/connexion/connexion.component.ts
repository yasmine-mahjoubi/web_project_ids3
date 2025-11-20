import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class ConnexionComponent implements OnInit, AfterViewInit, OnDestroy {
  email: string = '';
  motDePasse: string = '';
  messageErreur: string = '';
  chargement: boolean = false;
  montrerMotDePasse: boolean = false;
  connexionReussie: boolean = false;
  
  @ViewChild('particulesContainer') particulesContainer!: ElementRef;
  private animationFrameId: number | null = null;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Initialisation
  }

  ngAfterViewInit(): void {
    // Vérifier qu'on est dans un navigateur avant de créer les particules
    if (isPlatformBrowser(this.platformId)) {
      this.creerParticules();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // Fonction pour créer les particules animées en arrière-plan
  creerParticules(): void {
    // Vérifier que l'élément existe avant de l'utiliser
    if (!this.particulesContainer) {
      return;
    }
    
    const container = this.particulesContainer.nativeElement;
    const particuleCount = 15;
    
    for (let i = 0; i < particuleCount; i++) {
      const particule = document.createElement('div');
      particule.classList.add('particule');
      
      // Taille aléatoire entre 3px et 8px
      const size = Math.random() * 5 + 3;
      particule.style.width = `${size}px`;
      particule.style.height = `${size}px`;
      
      // Position aléatoire
      particule.style.left = `${Math.random() * 100}%`;
      particule.style.top = `${Math.random() * 100}%`;
      
      // Délai d'animation aléatoire
      particule.style.animationDelay = `${Math.random() * 15}s`;
      
      container.appendChild(particule);
    }
  }

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
      
      // Attendre un peu pour que l'utilisateur soit bien authentifié
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const role = await this.authService.obtenirRole();
      
      if (role === 'admin') {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1000);
      } else if (role === 'patient') {
        setTimeout(() => {
          this.router.navigate(['/patient/home']);
        }, 1000);
      } else {
        this.messageErreur = 'Erreur lors de la récupération du rôle utilisateur';
        this.notificationService.afficherErreur(this.messageErreur);
        console.error('Rôle non trouvé pour l\'utilisateur');
        await this.authService.deconnexion();
      }
      
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
    this.connexionReussie = false;
  }
}