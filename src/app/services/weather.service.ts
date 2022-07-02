import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// TODO: move interfaces to models dir
export interface ILocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface ICurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: ICondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface ICondition {
  text: string;
  icon: string;
  code: number;
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

  getCurrent(city: string, country: string): void {
    // TODO: error handling, server response and API call failure
    // TODO: caching... cache the response per city... calculate current local time from the last response
    // TODO: figure out better security for API key, here it is publicly exposed, it should never be publicly exposed... possibly handle with express/.net proxy
    this.loading$.next(true);
    this.data$.next({});
    this.http
      .get<IWeatherData>(
        `${environment.API_PATH}/v${environment.API_VER}/current.json?key=${environment.API_KEY}&q=${city},${country}&aqi=no&alerts=no`
      )
      .subscribe((data: IWeatherData) => {
        this.data$.next(data);
        this.loading$.next(false);
      });
  }

  getForecast(city: string, country: string, days: number = 7): void {
    this.loading$.next(true);
    this.data$.next({});
    this.http
      .get<IWeatherData>(
        `${environment.API_PATH}/v${environment.API_VER}/forecast.json?key=${environment.API_KEY}&q=${city},${country}&days=${days}&aqi=no&alerts=no`
      )
      .subscribe((data: IWeatherData) => {
        this.data$.next(data);
        this.loading$.next(false);
      });
  }
}
