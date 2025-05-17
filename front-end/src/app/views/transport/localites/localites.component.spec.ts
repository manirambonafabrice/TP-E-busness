import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalitesComponent } from './localites.component';

describe('LocalitesComponent', () => {
  let component: LocalitesComponent;
  let fixture: ComponentFixture<LocalitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
