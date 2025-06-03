import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  private readonly router = inject(Router);

  goToCreateUser() {
    this.router.navigate(['users']);
  }

  goToAccessRequest() {
    this.router.navigate(['access-requests']);
  }

  goToAssignComputer() {
    this.router.navigate(['computers']);
  }
}
