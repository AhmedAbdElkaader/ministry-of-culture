import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferncesComponent } from './confernces.component';

describe('ConferncesComponent', () => {
  let component: ConferncesComponent;
  let fixture: ComponentFixture<ConferncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
