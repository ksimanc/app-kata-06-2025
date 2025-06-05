import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  async listComputers(page: number) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers?page=${page}`;

    const res = await fetch(endpoint);
    const { total, computers } = await res.json();

    return { total, computers };
  }

  async registerComputer(data: any) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers`;

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async searchUsers(query: string, signal?: AbortSignal) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/search-users?q=${query}`;

    return fetch(endpoint, { signal });
  }

  async assignComputer(computerId: string, userId: string) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/assign`;

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ computerId, userId }),
    });
  }

  async getHistory(page: number) {
    const endpoint = `${environment.apiUrl}/kata-users-mngr/V1/computers/history?page=${page}`;

    const res = await fetch(endpoint);
    const { total, history } = await res.json();

    return { total, history };
  }
}
