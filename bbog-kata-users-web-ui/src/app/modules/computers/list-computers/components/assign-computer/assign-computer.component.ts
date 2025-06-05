import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Components, IOptions } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastService } from '../../../../../services/toast.service';
import { ComputerService } from '../../../services/computer.service';

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

  @ViewChild('userInput') nameInputRef?: ElementRef<Components.SpAtInput>;

  private readonly toast = inject(ToastService);

  private readonly computersService = inject(ComputerService);

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
    try {
      const res = await this.computersService.searchUsers(query, this.ctrl?.signal);
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

    const res = await this.computersService.assignComputer(this.computer.id, this.selectedUser?.id);

    if (res.status === 201) {
      this.toast.showToast('SUCCESS', 'Computador asignado correctamente');
      this.submit.emit();
      this.nameInputRef?.nativeElement.restartValue();
    } else {
      console.error('Failed to assign computer:', res.statusText);
    }
  }
}
