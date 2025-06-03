import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output } from '@angular/core';
import { environment } from '../../../../../../environment/environment';
import { ToastService } from '../../../../../services/toast.service';

@Component({
  selector: 'app-register-computer',
  standalone: true,
  templateUrl: './register-computer.component.html',
  styleUrls: ['./register-computer.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComputerComponent {
  private readonly toast = inject(ToastService);

  @Output() submit = new EventEmitter<void>();

  computerData = {
    model: '',
    serialNumber: '',
  };

  get showBtn() {
    return this.computerData.model && this.computerData.serialNumber;
  }

  async registerComputer() {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.computerData),
    });

    if (res.ok) {
      this.toast.showToast('SUCCESS', 'Computador registrado correctamente');
      this.submit.emit();
      this.computerData = { model: '', serialNumber: '' };
    } else {
      const data = await res.json();
      this.toast.showToast('ERROR', 'Error al registrar el computador');
      console.error('Error registering computer:', data);
    }
  }
}
