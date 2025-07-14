import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreItemsButtonComponent } from './more-items-button.component';

describe('MoreItemsButtonComponent', () => {
  let component: MoreItemsButtonComponent;
  let fixture: ComponentFixture<MoreItemsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreItemsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreItemsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
