import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeToutComponent } from './conge-tout.component';

describe('CongeToutComponent', () => {
  let component: CongeToutComponent;
  let fixture: ComponentFixture<CongeToutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeToutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeToutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
