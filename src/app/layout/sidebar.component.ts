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
  isCollapsed = signal(false);

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed.update((value) => !value);
  }

  navigateTo(route: string) {
    this.router.navigate([path]);
    this.isCollapsed.set(true);
  }
}
