import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  utilisateurActuel: User | null = null;

  constructor(private auth: Auth) {
    // Écouter les changements d'état de l'authentification
    onAuthStateChanged(this.auth, (utilisateur) => {
      this.utilisateurActuel = utilisateur;
    });
  }

  // Inscription d'un nouveau patient
  inscription(email: string, motDePasse: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, motDePasse);
  }

  // Connexion
  connexion(email: string, motDePasse: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, motDePasse);
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
}