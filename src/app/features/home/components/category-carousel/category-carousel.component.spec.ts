import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCarouselComponent } from './category-carousel.component';

describe('CategoryCarouselComponent', () => {
  let component: CategoryCarouselComponent;
  let fixture: ComponentFixture<CategoryCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
