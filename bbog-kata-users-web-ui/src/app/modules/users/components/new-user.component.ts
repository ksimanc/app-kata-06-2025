import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { IOptions } from '@npm-bbta/bbog-dig-dt-sherpa-lib/dist/types/utils/OptionsEnum/IOptions';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { Components } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { environment } from '../../../../environment/environment';
import { DevService } from '../../../services/dev.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewUserComponent {
  private readonly loader = inject(LoaderService);
  private readonly toast = inject(ToastService);
  private readonly dev = inject(DevService);

  @ViewChild('name') nameInputRef?: ElementRef<Components.SpAtInput>;
  @ViewChild('email') emailInputRef?: ElementRef<Components.SpAtAutocomplete>;
  @ViewChild('area') areaInputRef?: ElementRef<Components.SpAtInput>;
  @ViewChild('role') roleInputRef?: ElementRef<Components.SpAtDropdown>;

  @Output() submit = new EventEmitter<void>();

  private readonly roles = [
    'Desarrollador',
    'Analista de Calidad',
    'Gestor de Producto',
    'Agilista',
    'Ingeniero(a) DevOps',
    'Diseñador(a) de Experiencia',
  ];

  get showBtn() {
    return this.userData.name && this.isEmailValid() && this.userData.area && this.userData.role;
  }

  userData = {
    name: '',
    email: '',
    area: '',
    role: '',
  };

  roleOptions: IOptions[] = this.roles.map((role) => ({
    text: role,
    value: role,
  }));

  updateEmail(e: any) {
    this.userData.email = e.detail.value;
  }

  private isEmailValid(): boolean {
    const email = this.userData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async registerUser() {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/users`;

    this.loader.openLoader();

    await this.dev.sleep(2000);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.userData),
    });

    this.loader.closeLoader();

    if (res.ok) {
      this.toast.showToast('SUCCESS', 'Usuario creado correctamente');
      this.submit.emit();

      this.nameInputRef?.nativeElement.restartValue();
      this.emailInputRef?.nativeElement.setValue('');
      this.areaInputRef?.nativeElement.restartValue();
      this.roleInputRef?.nativeElement.reset();

      this.userData = {
        name: '',
        email: '',
        area: '',
        role: '',
      };
    } else {
      const error = await res.json();

      console.log(error);
      this.toast.showToast('ERROR', 'Error al crear el usuario');
    }
  }
}
