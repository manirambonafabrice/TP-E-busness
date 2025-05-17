import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisonSolcialComponent } from './raison-solcial.component';

describe('RaisonSolcialComponent', () => {
  let component: RaisonSolcialComponent;
  let fixture: ComponentFixture<RaisonSolcialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisonSolcialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisonSolcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
