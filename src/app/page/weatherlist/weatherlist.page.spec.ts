import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherlistPage } from './weatherlist.page';

describe('WeatherlistPage', () => {
  let component: WeatherlistPage;
  let fixture: ComponentFixture<WeatherlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
