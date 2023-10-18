import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairDetailsComponent } from './fair-details.component';

describe('FairDetailsComponent', () => {
  let component: FairDetailsComponent;
  let fixture: ComponentFixture<FairDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
