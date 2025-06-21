import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanComponent } from './admin-plan.component';

describe('AdminPlanComponent', () => {
  let component: AdminPlanComponent;
  let fixture: ComponentFixture<AdminPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
