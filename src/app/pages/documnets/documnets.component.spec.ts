import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumnetsComponent } from './documnets.component';

describe('DocumnetsComponent', () => {
  let component: DocumnetsComponent;
  let fixture: ComponentFixture<DocumnetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumnetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
