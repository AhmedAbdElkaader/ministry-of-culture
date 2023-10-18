import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheackOutComponent } from './cheack-out.component';

describe('CheackOutComponent', () => {
  let component: CheackOutComponent;
  let fixture: ComponentFixture<CheackOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheackOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheackOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
