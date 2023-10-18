import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensedetComponent } from './licensedet.component';

describe('LicensedetComponent', () => {
  let component: LicensedetComponent;
  let fixture: ComponentFixture<LicensedetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensedetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensedetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
