import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosDetComponent } from './videos-det.component';

describe('VideosDetComponent', () => {
  let component: VideosDetComponent;
  let fixture: ComponentFixture<VideosDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
