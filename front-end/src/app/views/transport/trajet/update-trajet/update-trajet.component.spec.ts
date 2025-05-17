import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrajetComponent } from './update-trajet.component';

describe('UpdateTrajetComponent', () => {
  let component: UpdateTrajetComponent;
  let fixture: ComponentFixture<UpdateTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrajetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
