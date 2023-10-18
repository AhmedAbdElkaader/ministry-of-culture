import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingApplyComponent } from './traing-apply.component';

describe('TraingApplyComponent', () => {
  let component: TraingApplyComponent;
  let fixture: ComponentFixture<TraingApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraingApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraingApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
