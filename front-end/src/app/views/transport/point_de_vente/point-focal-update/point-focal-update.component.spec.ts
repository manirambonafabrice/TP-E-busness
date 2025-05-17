import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointFocalUpdateComponent } from './point-focal-update.component';

describe('PointFocalUpdateComponent', () => {
  let component: PointFocalUpdateComponent;
  let fixture: ComponentFixture<PointFocalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointFocalUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointFocalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
