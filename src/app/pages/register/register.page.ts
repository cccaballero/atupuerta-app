import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  register(form:NgForm){
    if( !form.value.username ){
      this.alertService.presentToast("La nombre de usuario es requerido");
      return;
    }

    if( !form.value.email ){
      this.alertService.presentToast("La correo es requerido");
      return;
    }

    if( !form.value.password ){
      this.alertService.presentToast("La contraseña es requerida");
      return;
    }

    if( form.value.password != form.value.repassword ){
      this.alertService.presentToast("La contraseña y la confirmación no coinciden");
      return;
    }

    let params = {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
    };

    this.authService.register( params ).then(  value => {
      this.alertService.presentToast("Usuario registrado correctamente.");
      this.authService.login( params.username, params.password ).then(
        val => { 
          this.navCtrl.navigateRoot('/home');
        },
        err=> {
          this.alertService.presentToast("Error iniciando sección usuario.");
        }
      )
      
    }).catch( e => {
      this.alertService.presentToast("Error registrando usuario.");
    });
  }

  dismiss(){
    this.navCtrl.back();
  }
}
