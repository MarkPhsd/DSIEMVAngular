import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriPOSDeviceSetupComponent } from './tri-posdevice-setup.component';

describe('TriPOSDeviceSetupComponent', () => {
  let component: TriPOSDeviceSetupComponent;
  let fixture: ComponentFixture<TriPOSDeviceSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriPOSDeviceSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriPOSDeviceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
