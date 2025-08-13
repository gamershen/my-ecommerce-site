import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponentCombined } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponentCombined;
  let fixture: ComponentFixture<CartComponentCombined>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponentCombined]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponentCombined);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
