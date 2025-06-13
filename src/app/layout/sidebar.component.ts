import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import path from 'path';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [NgIf, MatIconModule, MatButtonModule],
})
export class SidebarComponent {
  isExpanded = signal(false);

  constructor(private router: Router) {}

  handleClick(label: string, path: string) {
    if (label === 'Inicio' || label === 'Más') {
      this.isExpanded.set(true);
    }
    this.router.navigate([path]);
  }

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }
}
