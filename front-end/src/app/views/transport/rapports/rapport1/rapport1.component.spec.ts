import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapport1Component } from './rapport1.component';

describe('Rapport1Component', () => {
  let component: Rapport1Component;
  let fixture: ComponentFixture<Rapport1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rapport1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Rapport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
