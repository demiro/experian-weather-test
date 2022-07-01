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

  constructor() {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('SUBMITTED');
  }
}
