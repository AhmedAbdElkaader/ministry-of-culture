import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelesDetComponent } from './reles-det.component';

describe('RelesDetComponent', () => {
  let component: RelesDetComponent;
  let fixture: ComponentFixture<RelesDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelesDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelesDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
