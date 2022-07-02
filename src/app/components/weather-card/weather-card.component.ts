import { ILocation } from './../../services/weather.service';
import { Component, Input, OnInit } from '@angular/core';
import { ICurrentWeather } from 'src/app/services/weather.service';

@Component({
  selector: 'experian-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() location?: ILocation | null;
  @Input() data?: ICurrentWeather | null;
  showF: boolean = false; // TODO: save and get this value from localStorage

  public get temp() {
    if (!this.data) return '';
    return this.showF ? this.data.temp_f + '°F' : this.data.temp_c + '°C';
  }
  public get tempFeels() {
    if (!this.data) return '';
    return this.showF
      ? this.data.feelslike_f + '°F'
      : this.data.feelslike_c + '°C';
  }

  constructor() {}

  ngOnInit(): void {}
}
