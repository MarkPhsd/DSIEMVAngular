import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalSettingsComponent } from './paypal-settings.component';

describe('PaypalSettingsComponent', () => {
  let component: PaypalSettingsComponent;
  let fixture: ComponentFixture<PaypalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
