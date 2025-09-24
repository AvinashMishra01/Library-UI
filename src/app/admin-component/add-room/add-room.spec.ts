import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  AddRoomComponent } from './add-room';

describe('RoomconfigurationComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
