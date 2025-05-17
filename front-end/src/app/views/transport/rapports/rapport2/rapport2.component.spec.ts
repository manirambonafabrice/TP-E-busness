import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapport2Component } from './rapport2.component';

describe('Rapport2Component', () => {
  let component: Rapport2Component;
  let fixture: ComponentFixture<Rapport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rapport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Rapport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
