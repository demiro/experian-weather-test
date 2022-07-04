import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { WeatherService } from './../../services/weather.service';

@Component({
  selector: 'experian-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit, AfterViewInit {
  tempUnitForm = new FormGroup({
    unitSwitch: new FormControl(false),
  });

  // TODO: by default sho country based on the user's IP
  weatherForm = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    country: new FormControl('United Kingdom', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  loading$: BehaviorSubject<boolean> = this.weatherService.loading$;
  @ViewChild('cityInput') cityInput!: ElementRef<HTMLInputElement>;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.weatherService.tempUnit$.subscribe((unit: string) => {
      this.tempUnitForm.controls.unitSwitch.setValue(unit === 'C');
    });
  }

  ngAfterViewInit(): void {
    this.cityInput.nativeElement.focus();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.weatherForm.invalid) {
      return;
    }

    // TODO: extra validation, especially allowed countries

    this.router
      .navigate([
        `/${(
          this.weatherForm.controls.country.value as string
        ).toLocaleLowerCase()}/${(
          this.weatherForm.controls.city.value as string
        ).toLocaleLowerCase()}`,
      ])
      .then(() => {
        this.weatherForm.reset();
        this.cityInput.nativeElement.focus();
      });
  }

  tempUnitChange(event: Event) {
    this.weatherService.changeTempUnit(
      this.tempUnitForm.controls.unitSwitch.value ? 'C' : 'F'
    );
  }
}
