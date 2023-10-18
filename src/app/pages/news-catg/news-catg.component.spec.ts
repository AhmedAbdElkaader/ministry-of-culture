import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCatgComponent } from './news-catg.component';

describe('NewsCatgComponent', () => {
  let component: NewsCatgComponent;
  let fixture: ComponentFixture<NewsCatgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCatgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
