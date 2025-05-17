import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxCongeComponent } from './flux-conge.component';

describe('FluxCongeComponent', () => {
  let component: FluxCongeComponent;
  let fixture: ComponentFixture<FluxCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
