import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTraficComponent } from './map-trafic.component';

describe('MapTraficComponent', () => {
  let component: MapTraficComponent;
  let fixture: ComponentFixture<MapTraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapTraficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
