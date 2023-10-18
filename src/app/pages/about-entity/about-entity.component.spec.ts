import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEntityComponent } from './about-entity.component';

describe('AboutEntityComponent', () => {
  let component: AboutEntityComponent;
  let fixture: ComponentFixture<AboutEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
