import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  goToCreateUser() {
    console.log('Crear usuario');
  }

  goToAccessRequest() {
    console.log('Solicitar acceso');
  }

  goToAssignComputer() {
    console.log('Asignar equipo');
  }
}
