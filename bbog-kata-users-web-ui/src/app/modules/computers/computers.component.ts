import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './computers.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComputersComponent {}
