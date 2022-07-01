import { StateService } from './../../services/state.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'experian-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  weatherForm = new FormGroup({
    city: new FormControl(''),
    country: new FormControl(''),
  });

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.state.currentCity$.subscribe((newValue: string) => {
      this.weatherForm.controls.city.patchValue(newValue);
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.stateService.changeValue('currentCity$', 1);
    console.log('SBMITTED');
  }
}
