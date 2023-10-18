import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReslesKenzSkafiComponent } from './resles-kenz-skafi.component';

describe('ReslesKenzSkafiComponent', () => {
  let component: ReslesKenzSkafiComponent;
  let fixture: ComponentFixture<ReslesKenzSkafiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReslesKenzSkafiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReslesKenzSkafiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
