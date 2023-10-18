import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusumKenzSkafiComponent } from './musum-kenz-skafi.component';

describe('MusumKenzSkafiComponent', () => {
  let component: MusumKenzSkafiComponent;
  let fixture: ComponentFixture<MusumKenzSkafiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusumKenzSkafiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusumKenzSkafiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
