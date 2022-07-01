import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { BehaviorSubject } from 'rxjs';

interface IState {
  currentCity$: BehaviorSubject<string>;
  currentCountry$: BehaviorSubject<string>;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  state: IState = {
    currentCity$: new BehaviorSubject<string>(''),
    currentCountry$: new BehaviorSubject<string>(''),
  };

  // TODO: better handling of the state
  changeValue(property: keyof IState, value: any): void {
    const _state = cloneDeep(this.state);
    _state[property].next(value);
    this.state = _state;
  }

  getValue(property: keyof IState): any {
    const _state = cloneDeep(this.state);
    return _state[property].getValue();
  }
}
