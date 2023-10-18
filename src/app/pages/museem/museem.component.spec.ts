import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseemComponent } from './museem.component';

describe('MuseemComponent', () => {
  let component: MuseemComponent;
  let fixture: ComponentFixture<MuseemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuseemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
