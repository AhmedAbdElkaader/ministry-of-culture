import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocmentDetComponent } from './docment-det.component';

describe('DocmentDetComponent', () => {
  let component: DocmentDetComponent;
  let fixture: ComponentFixture<DocmentDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocmentDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocmentDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
