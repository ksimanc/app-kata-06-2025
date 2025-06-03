import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IOptions } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '../../../../../../environment/environment';
import { ToastService } from '../../../../../services/toast.service';

@Component({
  selector: 'app-assign-computer',
  standalone: true,
  templateUrl: './assign-computer.component.html',
  styleUrls: ['./assign-computer.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssignComputerComponent implements OnInit, OnDestroy {
  @Input() computer?: {
    id: string;
    model: string;
    serialNumber: string;
    status: string;
    createdAt: string;
  };

  @Output() submit = new EventEmitter<void>();

  private readonly toast = inject(ToastService);

  private readonly querySubject = new BehaviorSubject('');

  options: IOptions[] = [];

  private sub?: Subscription;

  selectedUser?: any;

  private ctrl?: AbortController;

  ngOnInit(): void {
    this.sub = this.querySubject.subscribe(async (query) => {
      if (query.length < 1) {
        this.options = [];
        return;
      }

      const users = await this.searchUsers(query);

      this.options = users.map((user: any) => ({
        text: user.name,
        value: user,
      }));
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.ctrl?.abort();
  }

  updateQuery(query: string) {
    if (this.selectedUser?.name === query) {
      return;
    }

    this.selectedUser = undefined;
    this.ctrl?.abort();
    this.ctrl = new AbortController();
    this.querySubject.next(query);
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.ctrl?.abort();
  }

  async searchUsers(query: string) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/search-users?q=${query}`;

    try {
      const res = await fetch(endpoint, {
        signal: this.ctrl?.signal,
      });
      const data = await res.json();
      return data.users;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.debug('Search request aborted');
        return [];
      }

      throw err;
    }
  }

  async assignComputer() {
    if (!this.computer || !this.selectedUser) {
      return;
    }

    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/assign`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        computerId: this.computer.id,
        userId: this.selectedUser.id,
      }),
    });

    if (res.status === 201) {
      this.toast.showToast('SUCCESS', 'Computador asignado correctamente');
      this.submit.emit();
    } else {
      console.error('Failed to assign computer:', res.statusText);
    }
  }
}
