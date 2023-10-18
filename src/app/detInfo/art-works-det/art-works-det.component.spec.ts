import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorksDetComponent } from './art-works-det.component';

describe('ArtWorksDetComponent', () => {
  let component: ArtWorksDetComponent;
  let fixture: ComponentFixture<ArtWorksDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtWorksDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtWorksDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
