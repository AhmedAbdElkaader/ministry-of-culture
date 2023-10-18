import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseemDetComponent } from './museem-det.component';

describe('MuseemDetComponent', () => {
  let component: MuseemDetComponent;
  let fixture: ComponentFixture<MuseemDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuseemDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseemDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
