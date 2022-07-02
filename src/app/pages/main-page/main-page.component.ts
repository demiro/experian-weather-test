import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeatherData, WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'experian-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  data$: BehaviorSubject<IWeatherData> = this.weatherService.data$;
  loading$: BehaviorSubject<boolean> = this.weatherService.loading$;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}
}
