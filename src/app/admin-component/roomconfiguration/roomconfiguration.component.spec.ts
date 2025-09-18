import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomconfigurationComponent } from './roomconfiguration.component';

describe('RoomconfigurationComponent', () => {
  let component: RoomconfigurationComponent;
  let fixture: ComponentFixture<RoomconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomconfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
