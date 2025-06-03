import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Components } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AssignComputerComponent } from './components/assign-computer/assign-computer.component';
import { environment } from '../../../../environment/environment';
import { RegisterComputerComponent } from './components/register-computer/register-computer.component';

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [AsyncPipe, AssignComputerComponent, RegisterComputerComponent],
  templateUrl: './list-computers.component.html',
  styleUrls: ['./list-computers.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListComputersComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  selectedComputer?: any;

  @ViewChild('assignDrawer')
  assignDrawer?: ElementRef<Components.SpMlDrawer>;

  @ViewChild('registerDrawer')
  registerDrawer?: ElementRef<Components.SpMlDrawer>;

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
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers?page=${this.currentPage}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    this.pages = Math.ceil(data.total / 10);

    this.tableItems = data.computers.map((c: any) => ({
      id: c.id,
      Check: { value: 'checked', isChecked: 'false' },
      model: c.model,
      serialNumber: c.serialNumber,
      status: { type: this.getStatusType(c.status), text: c.status },
      createdAt: this.dateFmt.format(new Date(c.createdAt)),
      btn: c.status === 'Disponible' ? 'Asignar ›' : '',
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

  openAssignDrawer(e: any) {
    this.selectedComputer = e.detail.data;
    this.assignDrawer?.nativeElement.openDrawer();
  }

  openRegisterDrawer() {
    this.registerDrawer?.nativeElement.openDrawer();
  }

  handleSubmit() {
    this.assignDrawer?.nativeElement.closeDrawer();
    this.registerDrawer?.nativeElement.closeDrawer();
    this.gotoPage(1);
  }

  gotoHistory() {
    this.router.navigate(['history'], {
      relativeTo: this.route,
    });
  }

  private getStatusType(status: string) {
    switch (status) {
      case 'Disponible':
        return 'success';
      case 'Asignado':
        return 'info';
      case 'En mantenimiento':
        return 'warning';
      default:
        return 'info';
    }
  }
}
