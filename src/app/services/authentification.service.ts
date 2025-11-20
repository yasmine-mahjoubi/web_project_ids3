import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private auth = inject(Auth);
  private utilisateurService = inject(UtilisateurService);
  
  utilisateurActuel: User | null = null;

  constructor() {
    // Écouter les changements d'état de l'authentification
    onAuthStateChanged(this.auth, (utilisateur) => {
      this.utilisateurActuel = utilisateur;
    });
  }

  // Inscription d'un nouveau patient
  async inscription(email: string, motDePasse: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, motDePasse);
      
      // Créer le profil utilisateur dans Firestore avec le rôle "patient"
      const nouveauUtilisateur: Utilisateur = {
        uid: userCredential.user.uid,
        email: email,
        role: 'patient',
        dateCreation: new Date()
      };
      
      await this.utilisateurService.creerUtilisateur(nouveauUtilisateur);
    } catch (erreur) {
      throw erreur;
    }
  }

  // Connexion
  async connexion(email: string, motDePasse: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, motDePasse);
      return userCredential.user;
    } catch (erreur) {
      throw erreur;
    }
  }

  // Déconnexion
  deconnexion(): Promise<void> {
    return signOut(this.auth);
  }

  // Vérifier si l'utilisateur est connecté
  estConnecte(): boolean {
    return this.utilisateurActuel !== null;
  }

  // Obtenir l'utilisateur actuel
  obtenirUtilisateur(): User | null {
    return this.utilisateurActuel;
  }

  // Obtenir l'UID de l'utilisateur actuel
  obtenirUid(): string | null {
    return this.utilisateurActuel?.uid || null;
  }

  // Obtenir le rôle de l'utilisateur actuel
  async obtenirRole(): Promise<'patient' | 'admin' | null> {
    if (!this.utilisateurActuel) return null;
    
    const utilisateur = await this.utilisateurService.obtenirUtilisateur(this.utilisateurActuel.uid);
    return utilisateur?.role || null;
  }
}