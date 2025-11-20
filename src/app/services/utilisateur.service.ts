import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private firestore = inject(Firestore);

  // Créer un utilisateur dans Firestore
  async creerUtilisateur(utilisateur: Utilisateur): Promise<void> {
    const utilisateurRef = doc(this.firestore, `utilisateurs/${utilisateur.uid}`);
    await setDoc(utilisateurRef, {
      uid: utilisateur.uid,
      email: utilisateur.email,
      role: utilisateur.role,
      dateCreation: new Date(),
      nom: utilisateur.nom || '',
      prenom: utilisateur.prenom || ''
    });
  }

  // Récupérer un utilisateur depuis Firestore
  async obtenirUtilisateur(uid: string): Promise<Utilisateur | null> {
    try {
      const utilisateurRef = doc(this.firestore, `utilisateurs/${uid}`);
      const utilisateurSnap = await getDoc(utilisateurRef);
      
      if (utilisateurSnap.exists()) {
        return utilisateurSnap.data() as Utilisateur;
      }
      return null;
    } catch (erreur) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', erreur);
      return null;
    }
  }

  // Vérifier si un utilisateur est admin
  async estAdmin(uid: string): Promise<boolean> {
    const utilisateur = await this.obtenirUtilisateur(uid);
    return utilisateur?.role === 'admin';
  }

  // Vérifier si un utilisateur est patient
  async estPatient(uid: string): Promise<boolean> {
    const utilisateur = await this.obtenirUtilisateur(uid);
    return utilisateur?.role === 'patient';
  }
}