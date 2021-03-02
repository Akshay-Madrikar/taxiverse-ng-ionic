import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData, UserService } from './user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  loadedUsers: UserData[];
  private userSub: Subscription;
  private adminId = this.authService.userId;

  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.userService
      .fetchUsers()
      .subscribe((bookings: UserData[]) => {
        this.loadedUsers = bookings;
      });
  }

  onBlockUser(userId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Blocking user...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.userService.blockUser(userId, this.adminId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  onUnBlockUser(userId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Unblocking user...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.userService.UnblockUser(userId, this.adminId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
