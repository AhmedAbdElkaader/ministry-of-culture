import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickDetComponent } from './tick-det.component';

describe('TickDetComponent', () => {
  let component: TickDetComponent;
  let fixture: ComponentFixture<TickDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
