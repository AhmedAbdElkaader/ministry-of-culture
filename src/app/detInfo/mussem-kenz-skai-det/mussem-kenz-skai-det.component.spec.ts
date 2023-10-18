import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MussemKenzSkaiDetComponent } from './mussem-kenz-skai-det.component';

describe('MussemKenzSkaiDetComponent', () => {
  let component: MussemKenzSkaiDetComponent;
  let fixture: ComponentFixture<MussemKenzSkaiDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MussemKenzSkaiDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MussemKenzSkaiDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
