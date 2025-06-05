import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output } from '@angular/core';
import { ToastService } from '../../../../../services/toast.service';
import { ComputerService } from '../../../services/computer.service';

@Component({
  selector: 'app-register-computer',
  standalone: true,
  templateUrl: './register-computer.component.html',
  styleUrls: ['./register-computer.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComputerComponent {
  private readonly toast = inject(ToastService);

  private readonly computersService = inject(ComputerService);

  @Output() submit = new EventEmitter<void>();

  computerData = {
    model: '',
    serialNumber: '',
  };

  get showBtn() {
    return this.computerData.model && this.computerData.serialNumber;
  }

  async registerComputer() {
    const res = await this.computersService.registerComputer(this.computerData);

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
