import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ComputerService } from '../services/computer.service';

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

  private readonly computersService = inject(ComputerService);

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
    const data = await this.computersService.getHistory(this.currentPage);

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
