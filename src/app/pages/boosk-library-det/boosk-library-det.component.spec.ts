import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooskLibraryDetComponent } from './boosk-library-det.component';

describe('BooskLibraryDetComponent', () => {
  let component: BooskLibraryDetComponent;
  let fixture: ComponentFixture<BooskLibraryDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooskLibraryDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooskLibraryDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
