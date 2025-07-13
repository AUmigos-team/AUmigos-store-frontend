import { TestBed } from '@angular/core/testing';

import { CartSidebarService } from './cart-side-bar.service';

describe('CartSideBarService', () => {
  let service: CartSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
