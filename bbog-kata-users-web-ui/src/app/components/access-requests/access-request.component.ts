import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-access-request',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './access-request.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccessRequestComponent {}
