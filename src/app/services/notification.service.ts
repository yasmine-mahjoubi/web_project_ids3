import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'succes' | 'erreur' | 'info';
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification>({
    message: '',
    type: 'info',
    visible: false
  });

  notification$ = this.notificationSubject.asObservable();

  afficherSucces(message: string) {
    this.afficher(message, 'succes');
  }

  afficherErreur(message: string) {
    this.afficher(message, 'erreur');
  }

  afficherInfo(message: string) {
    this.afficher(message, 'info');
  }

  private afficher(message: string, type: 'succes' | 'erreur' | 'info') {
    this.notificationSubject.next({ message, type, visible: true });
    
    // Masquer automatiquement après 4 secondes
    setTimeout(() => {
      this.masquer();
    }, 4000);
  }

  masquer() {
    const current = this.notificationSubject.value;
    this.notificationSubject.next({ ...current, visible: false });
  }
}