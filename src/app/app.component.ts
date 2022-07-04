import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeatherData, WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'experian-app';

  data$: BehaviorSubject<IWeatherData> = this.weatherService.data$;
  loading$: BehaviorSubject<boolean> = this.weatherService.loading$;

  constructor(private weatherService: WeatherService) {}
}
