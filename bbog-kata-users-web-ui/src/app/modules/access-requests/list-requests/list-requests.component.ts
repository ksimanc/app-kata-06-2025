import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Components } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-list-requests',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListRequestsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @ViewChild('drawer')
  private readonly drawerRef?: ElementRef<Components.SpMlDrawer>;

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

  async listUsers() {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/apps/access-request?page=${this.currentPage}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    this.pages = Math.ceil(data.total / 10);

    this.tableItems = data.accessRequests.map((r: any) => ({
      id: r.id,
      Check: { value: 'checked', isChecked: 'false' },
      user: r.user.name,
      area: r.user.area,
      role: r.user.role,
      app: r.app.name,
      status: { type: this.getStatusType(r.status), text: r.status },
      createdAt: this.dateFmt.format(new Date(r.createdAt)),
    }));
  }

  async gotoPage(page: number) {
    await this.router.navigate([], { queryParams: { page }, relativeTo: this.route });
    await this.listUsers();
  }

  async ngOnInit() {
    if (!this.route.snapshot.queryParamMap.has('page')) {
      this.gotoPage(1);
    } else {
      await this.listUsers();
    }
  }

  gotoNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  handleUserCreated() {
    this.drawerRef?.nativeElement.closeDrawer();
    this.gotoPage(1);
  }

  private getStatusType(status: string) {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
      case 'Cancelado':
        return 'error';
      case 'Pendiente':
        return 'warning';
      default:
        return 'info';
    }
  }
}
