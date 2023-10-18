import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArelesesComponent } from './areleses.component';

describe('ArelesesComponent', () => {
  let component: ArelesesComponent;
  let fixture: ComponentFixture<ArelesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArelesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArelesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
