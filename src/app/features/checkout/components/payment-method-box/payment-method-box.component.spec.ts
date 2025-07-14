import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodBoxComponent } from './payment-method-box.component';

describe('PaymentMethodBoxComponent', () => {
  let component: PaymentMethodBoxComponent;
  let fixture: ComponentFixture<PaymentMethodBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
