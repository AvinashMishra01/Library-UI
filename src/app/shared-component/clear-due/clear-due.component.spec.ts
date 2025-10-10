import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDueComponent } from './clear-due.component';

describe('ClearDueComponent', () => {
  let component: ClearDueComponent;
  let fixture: ComponentFixture<ClearDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearDueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
