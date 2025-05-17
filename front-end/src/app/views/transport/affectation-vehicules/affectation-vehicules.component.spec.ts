import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationVehiculesComponent } from './affectation-vehicules.component';

describe('AffectationVehiculesComponent', () => {
  let component: AffectationVehiculesComponent;
  let fixture: ComponentFixture<AffectationVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationVehiculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
