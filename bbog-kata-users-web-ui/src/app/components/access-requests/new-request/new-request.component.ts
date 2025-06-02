import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { IOptions } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
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

  selectedUserId?: string;

  ngOnInit(): void {
    this.usersSub = this.querySubject.pipe(debounceTime(1000)).subscribe(async (query) => {
      if (query.length < 1) {
        this.usersOptions = [];
        return;
      }

      logger.log('Searching users with query:', query);

      const users = await this.searchUsers(query);

      this.usersOptions = users.map((user: any) => ({
        text: user.name,
        value: user.id,
      }));

      logger.debug('Users options:', this.usersOptions);
    });
  }

  ngOnDestroy(): void {
    this.usersSub?.unsubscribe();
  }

  updateQuery(query: string) {
    this.selectedUserId = undefined;

    this.querySubject.next(query);
  }

  async searchUsers(query: string) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/users/search?q=${query}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return data.users;
  }

  gotoList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
