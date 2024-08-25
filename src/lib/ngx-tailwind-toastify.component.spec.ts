import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTailwindToastifyComponent } from './ngx-tailwind-toastify.component';

describe('NgxTailwindToastifyComponent', () => {
  let component: NgxTailwindToastifyComponent;
  let fixture: ComponentFixture<NgxTailwindToastifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTailwindToastifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTailwindToastifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
