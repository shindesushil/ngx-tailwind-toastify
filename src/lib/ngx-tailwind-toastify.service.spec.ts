import { TestBed } from '@angular/core/testing';

import { NgxTailwindToastifyService } from './ngx-tailwind-toastify.service';

describe('NgxTailwindToastifyService', () => {
  let service: NgxTailwindToastifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTailwindToastifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
