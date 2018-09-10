import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGiftComponent } from './admin-gift.component';

describe('AdminGiftComponent', () => {
  let component: AdminGiftComponent;
  let fixture: ComponentFixture<AdminGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
