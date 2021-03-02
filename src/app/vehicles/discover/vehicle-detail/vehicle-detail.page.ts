import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddFuelDateComponent } from 'src/app/admin/add-fuel-date/add-fuel-date.component';
import { BookingService } from 'src/app/bookings/booking.service';
import { NewBookingComponent } from 'src/app/bookings/new-booking/new-booking.component';
import { VehicleData, VehiclesService } from '../../vehicles.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
})
export class VehicleDetailPage implements OnInit, OnDestroy {
  vehicle: VehicleData = {
    _id: '',
    name: '',
    imageUrl: '',
    fuelType: '',
    price: null,
    fuelChecklist: [],
    availableFrom: null,
    availableTo: null,
    updatedAt: '',
    createdAt: '',
    bookable: null,
  };
  private vehicleSub: Subscription;
  private user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private vehicleService: VehiclesService,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('vehicleId')) {
        this.navCtrl.navigateBack('/vehicles/tabs/discover');
        return;
      }

      this.vehicleSub = this.vehicleService
        .getSingleVehicle(paramMap.get('vehicleId'))
        .subscribe((vehicle: VehicleData) => {
          this.vehicle = vehicle;
        });
    });
  }

  onBookVehicle() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  onAddFuel() {
    this.modalCtrl
      .create({
        component: AddFuelDateComponent,
        componentProps: { selectedVehicle: this.vehicle },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Adding fuel date...' })
            .then((loadingEl) => {
              loadingEl.present();
              //const data = resultData.data.bookingData;
              this.vehicleService
                .addFuelDate(resultData.data.fuelDateData, this.vehicle._id)
                .subscribe(() => {
                  loadingEl.dismiss();
                  this.router.navigateByUrl(
                    `/admin/fuel-list/${this.vehicle._id}`
                  );
                });
            });
        }
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: NewBookingComponent,
        componentProps: { selectedVehicle: this.vehicle },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking vehicle...' })
            .then((loadingEl) => {
              loadingEl.present();
              //const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(resultData.data.bookingData)
                .subscribe(() => {
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/vehicles/tabs/bookings');
                });
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.vehicleSub) {
      this.vehicleSub.unsubscribe();
    }
  }
}
