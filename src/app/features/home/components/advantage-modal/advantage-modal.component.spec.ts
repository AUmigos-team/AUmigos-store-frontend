import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantageModalComponent } from './advantage-modal.component';

describe('AdvantageModalComponent', () => {
  let component: AdvantageModalComponent;
  let fixture: ComponentFixture<AdvantageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvantageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvantageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
