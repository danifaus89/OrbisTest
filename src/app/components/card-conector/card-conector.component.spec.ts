import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConectorComponent } from './card-conector.component';

describe('CardConectorComponent', () => {
  let component: CardConectorComponent;
  let fixture: ComponentFixture<CardConectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardConectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardConectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
