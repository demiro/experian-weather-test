import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrentWeather } from 'src/app/services/weather.service';
import { ILocation } from './../../services/weather.service';

@Component({
  selector: 'experian-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() loading: boolean | null = false;
  @Input() location?: ILocation | null;
  @Input() data?: ICurrentWeather | null;
  @Input() tempUnit?: string | null;

  @Output() changeTempUnit: Subject<string> = new Subject();

  public get temp() {
    if (!this.data) return '';
    return this.tempUnit === 'F'
      ? this.data.temp_f + '°F'
      : this.data.temp_c + '°C';
  }
  public get tempFeels() {
    if (!this.data) return '';
    return this.tempUnit === 'F'
      ? this.data.feelslike_f + '°F'
      : this.data.feelslike_c + '°C';
  }
}
