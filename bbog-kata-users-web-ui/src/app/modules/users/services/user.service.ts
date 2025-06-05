import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async listUsers(page: number) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/users?page=${page}`;

    const res = await fetch(endpoint);
    const { users, total } = await res.json();

    return { users, total };
  }

  async registerUser(user: any) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/users`;

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }
}
