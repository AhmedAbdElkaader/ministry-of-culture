import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingComponent } from './traing.component';

describe('TraingComponent', () => {
  let component: TraingComponent;
  let fixture: ComponentFixture<TraingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
