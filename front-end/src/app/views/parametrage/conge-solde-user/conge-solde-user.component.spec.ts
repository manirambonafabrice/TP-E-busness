import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeSoldeUserComponent } from './conge-solde-user.component';

describe('CongeSoldeUserComponent', () => {
  let component: CongeSoldeUserComponent;
  let fixture: ComponentFixture<CongeSoldeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeSoldeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeSoldeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
