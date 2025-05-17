import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiterCongeComponent } from './traiter-conge.component';

describe('TraiterCongeComponent', () => {
  let component: TraiterCongeComponent;
  let fixture: ComponentFixture<TraiterCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraiterCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraiterCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
