import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincePointComponent } from './province-point.component';

describe('ProvincePointComponent', () => {
  let component: ProvincePointComponent;
  let fixture: ComponentFixture<ProvincePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvincePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
