import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  private country?: string;
  private city?: string;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.country = params['country'].toString();
      this.city = params['city'].toString();
      if (this.country && this.city)
        this.weatherService.getCurrent(this.city, this.country);
    });
  }
}
