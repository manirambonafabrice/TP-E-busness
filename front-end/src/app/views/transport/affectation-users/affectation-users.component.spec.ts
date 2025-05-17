import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationUsersComponent } from './affectation-users.component';

describe('AffectationUsersComponent', () => {
  let component: AffectationUsersComponent;
  let fixture: ComponentFixture<AffectationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
