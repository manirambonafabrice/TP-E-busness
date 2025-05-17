import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuComponent } from './ou.component';

describe('OuComponent', () => {
  let component: OuComponent;
  let fixture: ComponentFixture<OuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
