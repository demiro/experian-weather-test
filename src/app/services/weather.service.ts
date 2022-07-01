import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

// TODO: move interfaces to models dir
interface ILocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface IWeatherData {
  location?: ILocation;
  current?: any; // TODO: define interface for this as well
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  data$: BehaviorSubject<IWeatherData> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  getCurrent(): void {
    // TODO: error handling, server response and API call failure
    // TODO: caching... cache the response per city... calculate current local time from the last response
    this.http
      .get<IWeatherData>(
        'http://api.weatherapi.com/v1/forecast.json?key=f7aa991d273c41eebf3164832220107&q=London&days=7&aqi=no&alerts=no'
      )
      .subscribe((data: IWeatherData) => {
        this.data$.next(data);
      });
  }

  getForecast() {}
}
