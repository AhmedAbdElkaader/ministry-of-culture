import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeventsComponent } from './aevents.component';

describe('AeventsComponent', () => {
  let component: AeventsComponent;
  let fixture: ComponentFixture<AeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
