import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  async sleep(ms: number): Promise<void> {
    if (environment.isLocal) {
      await new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
}
