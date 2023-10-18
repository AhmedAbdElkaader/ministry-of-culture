import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServDeteComponent } from './serv-dete.component';

describe('ServDeteComponent', () => {
  let component: ServDeteComponent;
  let fixture: ComponentFixture<ServDeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServDeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServDeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
