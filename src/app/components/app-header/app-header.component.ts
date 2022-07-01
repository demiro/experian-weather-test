import { BehaviorSubject } from 'rxjs';
import { IWeatherData, WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'experian-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  weatherForm = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  data$: BehaviorSubject<IWeatherData> = this.weatherService.data$;
  loading$: BehaviorSubject<boolean> = this.weatherService.loading$;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.weatherForm.invalid) {
      return;
    }

    // TODO: extra validation
    this.weatherService.getCurrent(
      this.weatherForm.controls.city.value as string,
      this.weatherForm.controls.country.value as string
    );
    console.log('SBMITTED');
  }
}
