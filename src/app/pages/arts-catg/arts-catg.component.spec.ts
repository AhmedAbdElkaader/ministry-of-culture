import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsCatgComponent } from './arts-catg.component';

describe('ArtsCatgComponent', () => {
  let component: ArtsCatgComponent;
  let fixture: ComponentFixture<ArtsCatgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtsCatgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
