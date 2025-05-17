import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeHistoriqueComponent } from './conge-historique.component';

describe('CongeHistoriqueComponent', () => {
  let component: CongeHistoriqueComponent;
  let fixture: ComponentFixture<CongeHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
