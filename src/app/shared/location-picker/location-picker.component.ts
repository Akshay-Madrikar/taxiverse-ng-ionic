import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocationData } from 'src/app/bookings/location.model';
import { MapModalComponent } from '../map-modal/map-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<LocationData>();
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then((modalEl) => {
      modalEl.onDidDismiss().then((modalData) => {
        console.log(modalData);
        if (!modalData) {
          return;
        }

        const pickedLocationData: LocationData = {
          source: {
            lat: modalData.data.source.lat,
            lng: modalData.data.source.lng,
          },
          destination: {
            lat: modalData.data.destination.lat,
            lng: modalData.data.destination.lng,
          },
          distance: modalData.data.distance,
          duration: modalData.data.duration,
        };
        console.log(pickedLocationData);
        this.locationPick.emit(pickedLocationData);
      });
      modalEl.present();
    });
  }
}
