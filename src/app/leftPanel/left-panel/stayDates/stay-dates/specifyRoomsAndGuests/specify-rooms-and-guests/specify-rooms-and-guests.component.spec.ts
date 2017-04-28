import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyRoomsAndGuestsComponent } from './specify-rooms-and-guests.component';

describe('SpecifyRoomsAndGuestsComponent', () => {
  let component: SpecifyRoomsAndGuestsComponent;
  let fixture: ComponentFixture<SpecifyRoomsAndGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifyRoomsAndGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyRoomsAndGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
