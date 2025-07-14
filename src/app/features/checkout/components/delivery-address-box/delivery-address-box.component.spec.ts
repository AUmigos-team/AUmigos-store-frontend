import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddressBoxComponent } from './delivery-address-box.component';

describe('DeliveryAddressBoxComponent', () => {
  let component: DeliveryAddressBoxComponent;
  let fixture: ComponentFixture<DeliveryAddressBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAddressBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddressBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
