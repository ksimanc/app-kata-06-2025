import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-assign-history',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './assign-history.component.html',
  styleUrls: ['./assign-history.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssignHistoryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  tableItems: any[] = [];

  currentPage$ = this.route.queryParams.pipe(
    map((params) => {
      const page = params['page'];
      return page ? parseInt(page, 10) : 1;
    })
  );

  pages = 1;

  get currentPage() {
    const page = this.route.snapshot.queryParamMap.get('page');
    return page ? parseInt(page, 10) : 1;
  }

  private readonly dateFmt = new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  async listComputers() {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/history?page=${this.currentPage}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    this.pages = Math.ceil(data.total / 10);

    this.tableItems = data.history.map((i: any) => ({
      id: i.id,
      Check: { value: 'checked', isChecked: 'false' },
      model: i.computer.model,
      serialNumber: i.computer.serialNumber,
      user: i.user.name,
      assignedAt: this.dateFmt.format(new Date(i.assignedAt)),
      returnedAt: i.returnedAt ? this.dateFmt.format(new Date(i.returnedAt)) : '',
    }));
  }

  async gotoPage(page: number) {
    await this.router.navigate([], { queryParams: { page }, relativeTo: this.route });
    await this.listComputers();
  }

  async ngOnInit() {
    if (!this.route.snapshot.queryParamMap.has('page')) {
      this.gotoPage(1);
    } else {
      await this.listComputers();
    }
  }
}
