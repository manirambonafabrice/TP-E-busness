import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisonSocialUpdateComponent } from './raison-social-update.component';

describe('RaisonSocialUpdateComponent', () => {
  let component: RaisonSocialUpdateComponent;
  let fixture: ComponentFixture<RaisonSocialUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisonSocialUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisonSocialUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
