import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointFocalComponent } from './point-focal.component';

describe('PointFocalComponent', () => {
  let component: PointFocalComponent;
  let fixture: ComponentFixture<PointFocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointFocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointFocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
