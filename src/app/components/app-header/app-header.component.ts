import { BehaviorSubject } from 'rxjs';
import { IWeatherData, WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'experian-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  weatherForm = new FormGroup({
    city: new FormControl('Piran', [
      Validators.required,
      Validators.minLength(2),
    ]),
    country: new FormControl('Slovenia', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  loading$: BehaviorSubject<boolean> = this.weatherService.loading$;

  constructor(private weatherService: WeatherService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.weatherForm.invalid) {
      return;
    }

    // TODO: extra validation, especially allowed countries
    this.weatherService.getCurrent(
      this.weatherForm.controls.city.value as string,
      this.weatherForm.controls.country.value as string
    );
  }
}
