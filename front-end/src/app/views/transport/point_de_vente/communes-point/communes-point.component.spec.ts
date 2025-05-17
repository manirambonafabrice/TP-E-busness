import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunesPointComponent } from './communes-point.component';

describe('CommunesPointComponent', () => {
  let component: CommunesPointComponent;
  let fixture: ComponentFixture<CommunesPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunesPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunesPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
