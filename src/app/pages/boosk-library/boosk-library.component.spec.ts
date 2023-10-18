import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooskLibraryComponent } from './boosk-library.component';

describe('BooskLibraryComponent', () => {
  let component: BooskLibraryComponent;
  let fixture: ComponentFixture<BooskLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooskLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooskLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
