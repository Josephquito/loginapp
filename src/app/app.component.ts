import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/register'];
        this.showSidebar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }
}
