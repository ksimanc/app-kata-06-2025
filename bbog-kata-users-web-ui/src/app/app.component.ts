import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'bbog-kata-users-web-ui';

  async getUsers() {
    const endpoint = 'http://localhost:3000/kata-users-mngr/V1/users';

    const res = await fetch(endpoint);
    const data = await res.json();
    console.log(data);
  }
}
