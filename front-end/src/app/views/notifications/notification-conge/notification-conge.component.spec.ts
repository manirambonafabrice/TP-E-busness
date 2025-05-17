import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCongeComponent } from './notification-conge.component';

describe('NotificationCongeComponent', () => {
  let component: NotificationCongeComponent;
  let fixture: ComponentFixture<NotificationCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
