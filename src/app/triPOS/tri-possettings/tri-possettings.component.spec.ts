import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriPOSSettingsComponent } from './tri-possettings.component';

describe('TriPOSSettingsComponent', () => {
  let component: TriPOSSettingsComponent;
  let fixture: ComponentFixture<TriPOSSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriPOSSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriPOSSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
