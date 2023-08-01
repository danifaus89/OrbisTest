import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPowerParamsComponent } from './card-power-params.component';

describe('CardPowerParamsComponent', () => {
  let component: CardPowerParamsComponent;
  let fixture: ComponentFixture<CardPowerParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPowerParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPowerParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
