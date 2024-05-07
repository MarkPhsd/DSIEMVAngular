import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriPOSTransactionsComponent } from './tri-postransactions.component';

describe('TriPOSTransactionsComponent', () => {
  let component: TriPOSTransactionsComponent;
  let fixture: ComponentFixture<TriPOSTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriPOSTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriPOSTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
