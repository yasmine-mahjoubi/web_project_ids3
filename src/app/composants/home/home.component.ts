import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery: string = '';

  features = [
    {
      icon: '📍',
      title: 'Trouvez facilement',
      description: 'Recherchez des cliniques par localisation, spécialité ou nom'
    },
    {
      icon: '🩺',
      title: 'Choisissez votre médecin',
      description: 'Consultez les profils et spécialités des médecins'
    },
    {
      icon: '🔍',
      title: 'Réservez en ligne',
      description: 'Prenez rendez-vous 24/7 et gérez vos consultations'
    }
  ];

  specialties = [
    { name: 'Cardiologie', icon: '❤️' },
    { name: 'Dermatologie', icon: '🧴' },
    { name: 'Pédiatrie', icon: '👶' },
    { name: 'Orthopédie', icon: '🦴' },
    { name: 'Ophtalmologie', icon: '👁️' },
    { name: 'Dentaire', icon: '🦷' }
  ];

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      // Navigation vers la page de recherche avec query
      
    }
  }

  navigateToClinics() {
    // mazelt macodithech
  }

  navigateToDoctors() {
    // mazelt macodithech
  }

  navigateToLogin() {
    this.router.navigate(['/connexion']);
  }
  navigateToRegister() {
    this.router.navigate(['/inscription']);
  }
}