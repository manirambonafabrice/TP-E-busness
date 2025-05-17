import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeInitModifComponent } from './conge-init-modif.component';

describe('CongeInitModifComponent', () => {
  let component: CongeInitModifComponent;
  let fixture: ComponentFixture<CongeInitModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeInitModifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeInitModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
