import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayDatesComponent } from './stay-dates.component';

describe('StayDatesComponent', () => {
  let component: StayDatesComponent;
  let fixture: ComponentFixture<StayDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
