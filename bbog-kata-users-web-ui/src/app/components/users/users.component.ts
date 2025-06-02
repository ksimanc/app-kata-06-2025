import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NewUserComponent } from './components/new-user.component';
import { Components } from '@npm-bbta/bbog-dig-dt-sherpa-lib';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [AsyncPipe, NewUserComponent],
  styleUrls: ['./users.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersComponent implements OnInit {
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
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/users?page=${this.currentPage}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    this.pages = Math.ceil(data.total / 10);

    this.tableItems = data.users.map((user: any) => ({
      id: user.id,
      Check: { value: 'checked', isChecked: 'false' },
      usuario: user.name,
      role: user.role,
      status: { type: this.getStatusType(user.status), text: user.status },
      createdAt: this.dateFmt.format(new Date(user.createdAt)),
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

  openDrawer() {
    this.drawerRef?.nativeElement.openDrawer();
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
        return 'error';
      case 'Pendiente':
        return 'warning';
      default:
        return 'info';
    }
  }
}
