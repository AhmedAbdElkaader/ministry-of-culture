import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AworksComponent } from './aworks.component';

describe('AworksComponent', () => {
  let component: AworksComponent;
  let fixture: ComponentFixture<AworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
