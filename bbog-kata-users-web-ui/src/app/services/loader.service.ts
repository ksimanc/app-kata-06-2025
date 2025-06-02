import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader?: HTMLSpMlLoaderElement;

  openLoader() {
    this.loader = document.createElement('sp-ml-loader', { is: 'sp-ml-loader' });
    this.loader.isOpen = true;

    this.loader.style.zIndex = '999999';
    this.loader.style.position = 'absolute';

    document.body.append(this.loader);
  }

  closeLoader() {
    this.loader?.closeLoader();

    setTimeout(() => {
      this.loader?.remove();
    }, 5000);
  }
}
