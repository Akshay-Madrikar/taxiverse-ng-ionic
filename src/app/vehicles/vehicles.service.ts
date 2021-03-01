import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Vehicle } from './vehicle.model';

export interface VehicleData {
  _id?: string;
  name: string;
  imageUrl: string;
  fuelType: string;
  price: number;
  fuelChecklist?: string[];
  availableFrom: Date;
  availableTo: Date;
  updatedAt: string;
  createdAt: string;
  bookable?: number;
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  //new Vehicle(
  //   'v1',
  //   'Wagon R',
  //   'https://www.shivamautozone.com/wp-content/uploads/2019/01/SUPERIOR-WHITE.png',
  //   'Petrol',
  //   11,
  //   [],
  //   new Date('2020-03-01'),
  //   new Date('2020-09-01')
  // ),
  // new Vehicle(
  //   'v2',
  //   'Swift',
  //   'https://imgd.aeplcdn.com/0x0/n/cw/ec/26742/swift-exterior-right-front-three-quarter-2.jpeg',
  //   'Diesel',
  //   11,
  //   [],
  //   new Date('2020-03-01'),
  //   new Date('2020-09-01')
  // ),
  // new Vehicle(
  //   'v3',
  //   'Ertiga',
  //   'https://imgd.aeplcdn.com/664x374/n/cw/ec/35211/ertiga-exterior-right-front-three-quarter-141878.jpeg?q=85',
  //   'Petrol',
  //   15,
  //   [],
  //   new Date('2020-03-01'),
  //   new Date('2020-09-01')
  // ),
  // new Vehicle(
  //   'v4',
  //   'Innova',
  //   'https://imgd.aeplcdn.com/0x0/n/cw/ec/51435/innova-crysta-facelift-exterior-right-front-three-quarter-2.jpeg',
  //   'Diesel',
  //   15,
  //   [],
  //   new Date('2020-03-01'),
  //   new Date('2020-09-01')
  // ),

  // private _vehicles = new BehaviorSubject<Vehicle[]>([]);

  // constructor(private http: HttpClient) {}

  // get vehicles() {
  //   return this._vehicles.asObservable();
  // }
  public headers: HttpHeaders;
  private authToken = this.authService.getCurrentUserToken();
  private userId = this.authService.userId;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getSingleVehicle(vehicleId: string) {
    return this.http.get(`http://localhost:5000/api/vehicle/${vehicleId}`).pipe(
      map((resData: VehicleData) => {
        return resData;
      })
    );
  }

  fetchVehicles() {
    return this.http.get(`http://localhost:5000/api/vehicles/all`).pipe(
      map((resData) => {
        return resData;
      })
    );
  }

  addVehicle(vehicleData) {
    return this.http
      .post(
        `http://localhost:5000/api/vehicle/create/${this.userId}`,
        {
          vehicleData,
        },
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.authToken}`
          ),
        }
      )
      .pipe(map((resData) => resData));
  }

  onRemoveVehicle(vehicleId: string) {
    return this.http
      .delete(`http://localhost:5000/api/vehicle/${vehicleId}/${this.userId}`, {
        headers: this.headers.append(
          'Authorization',
          `Bearer ${this.authToken}`
        ),
      })
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }

  // .pipe(
  //   map((resData) => {
  //     let vehicles = [];
  //     resData.forEach((value, key, array) => {
  //       vehicles.push(
  //         new Vehicle(
  //           resData[key]._id,
  //           resData[key].name,
  //           resData[key].imageUrl,
  //           resData[key].fuelType,
  //           resData[key].price,
  //           resData[key].fuelChecklist,
  //           new Date(resData[key].availableFrom),
  //           new Date(resData[key].availableTo),
  //         )
  //       );
  //     });
  //     return vehicles;
  //   }),
  //   tap((vehicles) => {
  //     this._vehicles.next(vehicles);
  //   })
  // );
}
