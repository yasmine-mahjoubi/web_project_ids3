import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notification: Notification = { message: '', type: 'info', visible: false };

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(
      notification => this.notification = notification
    );
  }

  fermer() {
    this.notificationService.masquer();
  }
}