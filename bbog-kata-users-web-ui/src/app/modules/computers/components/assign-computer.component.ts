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
import { BehaviorSubject, Subscription, debounceTime } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ToastService } from '../../../services/toast.service';

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

  ngOnInit(): void {
    this.sub = this.querySubject.pipe(debounceTime(1000)).subscribe(async (query) => {
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
  }

  updateQuery(query: string) {
    this.selectedUser = undefined;
    this.querySubject.next(query);
  }

  async searchUsers(query: string) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/search-users?q=${query}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return data.users;
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
