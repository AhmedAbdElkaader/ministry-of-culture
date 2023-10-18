import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairApplyComponent } from './fair-apply.component';

describe('FairApplyComponent', () => {
  let component: FairApplyComponent;
  let fixture: ComponentFixture<FairApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
