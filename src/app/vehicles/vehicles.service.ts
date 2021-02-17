import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private _vehicles: Vehicle[] = [
    new Vehicle(
      'v1',
      'Wagon R',
      'https://www.shivamautozone.com/wp-content/uploads/2019/01/SUPERIOR-WHITE.png',
      'Petrol',
      11,
      []
    ),
    new Vehicle(
      'v2',
      'Swift',
      'https://imgd.aeplcdn.com/0x0/n/cw/ec/26742/swift-exterior-right-front-three-quarter-2.jpeg',
      'Diesel',
      11,
      []
    ),
    new Vehicle(
      'v3',
      'Ertiga',
      'https://imgd.aeplcdn.com/664x374/n/cw/ec/35211/ertiga-exterior-right-front-three-quarter-141878.jpeg?q=85',
      'Petrol',
      15,
      []
    ),
    new Vehicle(
      'v4',
      'Innova',
      'https://imgd.aeplcdn.com/0x0/n/cw/ec/51435/innova-crysta-facelift-exterior-right-front-three-quarter-2.jpeg',
      'Diesel',
      15,
      []
    ),
  ];

  get vehicles() {
    return [...this._vehicles];
  }
  constructor() {}
}
