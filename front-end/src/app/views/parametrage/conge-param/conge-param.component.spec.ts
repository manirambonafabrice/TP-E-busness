import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeParamComponent } from './conge-param.component';

describe('CongeParamComponent', () => {
  let component: CongeParamComponent;
  let fixture: ComponentFixture<CongeParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
