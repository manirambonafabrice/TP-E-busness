import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesUpdateComponent } from './zones-update.component';

describe('ZonesUpdateComponent', () => {
  let component: ZonesUpdateComponent;
  let fixture: ComponentFixture<ZonesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
