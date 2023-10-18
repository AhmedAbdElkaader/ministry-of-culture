import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetComponent } from './events-det.component';

describe('EventsDetComponent', () => {
  let component: EventsDetComponent;
  let fixture: ComponentFixture<EventsDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
