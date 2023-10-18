import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingDetComponent } from './traing-det.component';

describe('TraingDetComponent', () => {
  let component: TraingDetComponent;
  let fixture: ComponentFixture<TraingDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraingDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraingDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
