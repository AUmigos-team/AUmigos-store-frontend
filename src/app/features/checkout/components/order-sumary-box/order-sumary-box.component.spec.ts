import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSumaryBoxComponent } from './order-sumary-box.component';

describe('OrderSumaryBoxComponent', () => {
  let component: OrderSumaryBoxComponent;
  let fixture: ComponentFixture<OrderSumaryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSumaryBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSumaryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
