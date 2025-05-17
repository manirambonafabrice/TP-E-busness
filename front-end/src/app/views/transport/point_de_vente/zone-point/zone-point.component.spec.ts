import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePointComponent } from './zone-point.component';

describe('ZonePointComponent', () => {
  let component: ZonePointComponent;
  let fixture: ComponentFixture<ZonePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
