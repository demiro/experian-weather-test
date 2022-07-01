import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
