import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { ISelector } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { ToastService } from '../../../../services/toast.service';
import { BdbCustomLogger } from '@npm-bbta/sdk-ae-frontend-utils-logs-lib';

const logger = new BdbCustomLogger('request-form');
logger.colors.log = 'green';

@Component({
  selector: 'app-request-form',
  standalone: true,
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequestFormComponent implements OnInit {
  @Input() user?: any;

  @Output() submit = new EventEmitter<void>();

  private readonly toast = inject(ToastService);

  availableApps: ISelector[] = [];
  selectedApps: string[] = [];

  async ngOnInit() {
    logger.log('Mounted:', { userId: this.user.id });
    await this.getAvailableApps();
  }

  async getAvailableApps() {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/apps?userId=${this.user.id}`;

    const res = await fetch(endpoint);
    const { apps } = await res.json();

    this.availableApps = apps.map((app: any) => ({
      id: app.id,
      value: app.id,
      title: app.name,
      desc: app.description,
      isChecked: 'false',
    }));
  }

  handleSelection(e: CustomEvent) {
    const card = e.detail.card;

    if (card.isChecked === 'true') {
      this.selectedApps.push(card.id);
    }

    if (card.isChecked === 'false') {
      this.selectedApps = this.selectedApps.filter((appId) => appId !== card.id);
    }
  }

  async requestAccess() {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/apps/access-request`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.user.id,
        appIds: this.selectedApps,
      }),
    });

    if (res.status === 201) {
      this.toast.showToast('SUCCESS', 'Solicitud de acceso enviada correctamente');
      this.submit.emit();
    } else {
      const error = await res.text();
      console.error(error);
      this.toast.showToast('ERROR', 'Ha ocurrido un error');
    }
  }
}
