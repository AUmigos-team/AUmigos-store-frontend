import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemBoxComponent } from './cart-item-box.component';

describe('CartItemBoxComponent', () => {
  let component: CartItemBoxComponent;
  let fixture: ComponentFixture<CartItemBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
