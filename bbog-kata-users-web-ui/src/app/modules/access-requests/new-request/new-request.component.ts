import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { IOptions } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { RequestFormComponent } from './components/request-form.component';
import { BdbCustomLogger } from '@npm-bbta/sdk-ae-frontend-utils-logs-lib';
import { ActivatedRoute, Router } from '@angular/router';

const logger = new BdbCustomLogger('new-request');
logger.colors.log = 'blue';

@Component({
  selector: 'app-new-request',
  standalone: true,
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
  imports: [RequestFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewRequestComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly querySubject = new BehaviorSubject('');

  usersOptions: IOptions[] = [];

  private usersSub?: Subscription;

  selectedUser?: any;

  private ctrl?: AbortController;

  ngOnInit(): void {
    this.usersSub = this.querySubject.subscribe(async (query) => {
      if (query.length < 1) {
        this.usersOptions = [];
        return;
      }

      logger.log('Searching users with query:', query);

      const users = await this.searchUsers(query);

      this.usersOptions = users.map((user: any) => ({
        text: user.name,
        value: user,
      }));

      logger.debug('Users options:', this.usersOptions);
    });
  }

  ngOnDestroy(): void {
    this.usersSub?.unsubscribe();
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
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/users/search?q=${query}`;

    try {
      const res = await fetch(endpoint, {
        signal: this.ctrl?.signal,
      });

      const data = await res.json();

      return data.users;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        logger.debug('Search request aborted');
        return [];
      }
      throw err;
    }
  }

  gotoList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
