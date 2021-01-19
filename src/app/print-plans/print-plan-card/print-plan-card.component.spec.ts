import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPlanCardComponent } from './print-plan-card.component';

describe('PrintPlanCardComponent', () => {
  let component: PrintPlanCardComponent;
  let fixture: ComponentFixture<PrintPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPlanCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
