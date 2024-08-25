import { Provider } from '@angular/core';
import { NgxTailwindToastifyService } from './ngx-tailwind-toastify.service';
import { NgxTailwindToastifyComponent } from './ngx-tailwind-toastify.component';

export function provideNgxTailwindToastify(): Provider {
  return {
    provide: NgxTailwindToastifyComponent,
    useClass: NgxTailwindToastifyComponent,
  };
}
