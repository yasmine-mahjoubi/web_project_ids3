export interface Utilisateur {
  uid: string;
  email: string;
  role: 'patient' | 'admin';
  dateCreation: Date;
  nom?: string;
  prenom?: string;
}