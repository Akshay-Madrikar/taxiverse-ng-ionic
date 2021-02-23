import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;

    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Loading...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        if (this.isLogin) {
          this.authService.login(email, password).subscribe(
            (resData) => {
              console.log(resData);
              this.isLoading = false;
              loadingEl.dismiss();
              this.router.navigateByUrl('/vehicles/tabs/discover');
            },
            (error) => {
              loadingEl.dismiss();
              this.showAlert('Email or password is wrong');
            }
          );
        } else {
          this.authService.signup(email, password).subscribe(
            (resData) => {
              console.log(resData);
              this.isLoading = false;
              loadingEl.dismiss();
              this.router.navigateByUrl('/vehicles/tabs/discover');
            },
            (error) => {
              loadingEl.dismiss();
              this.showAlert('Email ID exists');
            }
          );
        }
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    this.authenticate(email, password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication Failed!',
        message: message,
        buttons: ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }
}
