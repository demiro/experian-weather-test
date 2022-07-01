import { BehaviorSubject } from 'rxjs';
import { IWeatherData, WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'experian-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  weatherForm = new FormGroup({
    city: new FormControl(''),
    // country: new FormControl(''),
  });

  data$: BehaviorSubject<IWeatherData> = this.weatherService.data$;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    // TODO: extra validation
    this.weatherService.getCurrent();
    console.log('SBMITTED');
  }
}
