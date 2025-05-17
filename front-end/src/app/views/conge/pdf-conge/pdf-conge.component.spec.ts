import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCongeComponent } from './pdf-conge.component';

describe('PdfCongeComponent', () => {
  let component: PdfCongeComponent;
  let fixture: ComponentFixture<PdfCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
