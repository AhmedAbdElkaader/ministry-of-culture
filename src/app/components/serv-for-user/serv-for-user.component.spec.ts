import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServForUserComponent } from './serv-for-user.component';

describe('ServForUserComponent', () => {
  let component: ServForUserComponent;
  let fixture: ComponentFixture<ServForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
