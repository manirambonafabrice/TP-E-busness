import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOuComponent } from './update-ou.component';

describe('UpdateOuComponent', () => {
  let component: UpdateOuComponent;
  let fixture: ComponentFixture<UpdateOuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
