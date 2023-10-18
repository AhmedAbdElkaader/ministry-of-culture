import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetelisComponent } from './detelis.component';

describe('DetelisComponent', () => {
  let component: DetelisComponent;
  let fixture: ComponentFixture<DetelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
