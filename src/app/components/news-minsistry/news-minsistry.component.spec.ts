import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMinsistryComponent } from './news-minsistry.component';

describe('NewsMinsistryComponent', () => {
  let component: NewsMinsistryComponent;
  let fixture: ComponentFixture<NewsMinsistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsMinsistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMinsistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
