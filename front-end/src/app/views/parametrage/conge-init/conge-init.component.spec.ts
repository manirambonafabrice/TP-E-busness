import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeInitComponent } from './conge-init.component';

describe('CongeInitComponent', () => {
  let component: CongeInitComponent;
  let fixture: ComponentFixture<CongeInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
