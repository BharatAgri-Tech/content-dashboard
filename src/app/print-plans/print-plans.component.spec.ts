import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPlansComponent } from './print-plans.component';

describe('PrintPlansComponent', () => {
  let component: PrintPlansComponent;
  let fixture: ComponentFixture<PrintPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
