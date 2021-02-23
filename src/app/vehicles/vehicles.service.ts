import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Vehicle } from './vehicle.model';

export interface VehicleData {
  _id: string;
  name: string;
  imageUrl: string;
  fuelType: string;
  price: number;
  fuelChecklist: string[];
  availableFrom: Date;
  availableTo: Date;
  bookable?: number;
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  // private _vehicles: Vehicle[] = [
  //   new Vehicle(
  //     'v1',
  //     'Wagon R',
  //     'https://www.shivamautozone.com/wp-content/uploads/2019/01/SUPERIOR-WHITE.png',
  //     'Petrol',
  //     11,
  //     [],
  //     new Date('2020-03-01'),
  //     new Date('2020-09-01')
  //   ),
  //   new Vehicle(
  //     'v2',
  //     'Swift',
  //     'https://imgd.aeplcdn.com/0x0/n/cw/ec/26742/swift-exterior-right-front-three-quarter-2.jpeg',
  //     'Diesel',
  //     11,
  //     [],
  //     new Date('2020-03-01'),
  //     new Date('2020-09-01')
  //   ),
  //   new Vehicle(
  //     'v3',
  //     'Ertiga',
  //     'https://imgd.aeplcdn.com/664x374/n/cw/ec/35211/ertiga-exterior-right-front-three-quarter-141878.jpeg?q=85',
  //     'Petrol',
  //     15,
  //     [],
  //     new Date('2020-03-01'),
  //     new Date('2020-09-01')
  //   ),
  //   new Vehicle(
  //     'v4',
  //     'Innova',
  //     'https://imgd.aeplcdn.com/0x0/n/cw/ec/51435/innova-crysta-facelift-exterior-right-front-three-quarter-2.jpeg',
  //     'Diesel',
  //     15,
  //     [],
  //     new Date('2020-03-01'),
  //     new Date('2020-09-01')
  //   ),
  // ];

  // get vehicles() {
  //   return [...this._vehicles];
  // }

  // getVehicle(id: string) {
  //   return { ...this._vehicles.find((v) => v.id === id) };
  // }

  private _vehicles = new BehaviorSubject<Vehicle[]>([
    new Vehicle(
      'v1',
      'Wagon R',
      'https://www.shivamautozone.com/wp-content/uploads/2019/01/SUPERIOR-WHITE.png',
      'Petrol',
      11,
      [],
      new Date('2020-03-01'),
      new Date('2020-09-01')
    ),
    new Vehicle(
      'v2',
      'Swift',
      'https://imgd.aeplcdn.com/0x0/n/cw/ec/26742/swift-exterior-right-front-three-quarter-2.jpeg',
      'Diesel',
      11,
      [],
      new Date('2020-03-01'),
      new Date('2020-09-01')
    ),
    new Vehicle(
      'v3',
      'Ertiga',
      'https://imgd.aeplcdn.com/664x374/n/cw/ec/35211/ertiga-exterior-right-front-three-quarter-141878.jpeg?q=85',
      'Petrol',
      15,
      [],
      new Date('2020-03-01'),
      new Date('2020-09-01')
    ),
    new Vehicle(
      'v4',
      'Innova',
      'https://imgd.aeplcdn.com/0x0/n/cw/ec/51435/innova-crysta-facelift-exterior-right-front-three-quarter-2.jpeg',
      'Diesel',
      15,
      [],
      new Date('2020-03-01'),
      new Date('2020-09-01')
    ),
  ]);

  constructor(private http: HttpClient) {}

  get vehicles() {
    return this._vehicles.asObservable();
  }

  getVehicle(id: string) {
    return this.vehicles.pipe(
      take(1),
      map((vehicles) => {
        return { ...vehicles.find((v) => v.id === id) };
      })
    );
  }

  // fetchVehicles() {
  //   return this.http
  //     .get<{ [key: string]: VehicleData }>(
  //       'http://localhost:5000/api/vehicles/all'
  //     )
  //     .pipe(
  //       map((resData) => {
  //         const vehicles = [];
  //         for (let key in resData) {
  //           if (resData.hasOwnProperty(key)) {
  //             vehicles.push(
  //               new Vehicle(
  //                 resData[key]._id,
  //                 resData[key].name,
  //                 resData[key].imageUrl,
  //                 resData[key].fuelType,
  //                 resData[key].price,
  //                 resData[key].fuelChecklist,
  //                 new Date(resData[key].availableFrom),
  //                 new Date(resData[key].availableTo)
  //               )
  //             );
  //           }
  //         }
  //         return vehicles;
  //       }),
  //       tap((vehicles) => {
  //         console.log(typeof vehicles);
  //         this._vehicles.next(vehicles);
  //       })
  //     );
  //   // .pipe(
  //   //   map((resData) => {
  //   //     console.log(resData);
  //   //     return resData;
  //   //   })
  //   // );
  // }
  // .pipe(
  //   map((resData) => {
  //     const vehicles = [];
  //     for (let key in resData) {
  //       if (resData.hasOwnProperty(key)) {
  //         vehicles.push(
  //           new Vehicle(
  //             resData[key].id,
  //             resData[key].name,
  //             resData[key].imageUrl,
  //             resData[key].fuelType,
  //             resData[key].price,
  //             resData[key].fuelChecklist,
  //             new Date(resData[key].availableFrom),
  //             new Date(resData[key].availableTo)
  //           )
  //         );
  //       }
  //     }
  //     return resData;
  //   }),
  //   tap((vehicles) => {
  //     console.log(typeof vehicles);
  //     this._vehicles.next(vehicles);
  //   })
  // );
}
