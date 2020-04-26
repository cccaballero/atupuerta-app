import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  register(form:NgForm){
    if( !form.value.password ){
      this.alertService.presentToast("La contraseña es requerida");
      return;
    }

    if( form.value.password != form.value.repassword ){
      this.alertService.presentToast("La contraseña y la confirmación no coinciden");
      return;
    }

      /*this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/dashboard');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );*/
  }

  dismiss(){
    this.navCtrl.back();
  }
}
