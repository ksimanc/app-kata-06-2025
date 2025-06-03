import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast?: HTMLSpAtToastElement;

  async showToast(type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO', message: string) {
    this.toast = document.createElement('sp-at-toast', { is: 'sp-at-toast' });
    this.toast.type = type;
    this.toast.message = message;

    document.body.prepend(this.toast);

    await this.toast.show();
  }
}
