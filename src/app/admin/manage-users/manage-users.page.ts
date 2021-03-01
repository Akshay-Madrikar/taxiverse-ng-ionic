import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserData, UserService } from './user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  loadedUsers: UserData[];
  private userSub: Subscription;

  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.userSub = this.userService
      .fetchUsers()
      .subscribe((bookings: UserData[]) => {
        this.loadedUsers = bookings;
      });
  }

  // onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
  //   slidingEl.close();
  //   this.loadingCtrl
  //     .create({ message: 'Cancelling booking...' })
  //     .then((loadingEl) => {
  //       loadingEl.present();
  //       this.userService.cancelBooking(bookingId).subscribe(() => {
  //         loadingEl.dismiss();
  //       });
  //     });
  // }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
