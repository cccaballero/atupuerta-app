import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  } 

  async login(form: NgForm) {
      let username =  form.value.email;
      let password =  form.value.password;

      if( !username || username === "" || !password || password === "" ){
        this.alertService.presentToast("Usuario y contraseña son requeridos.");
        return;
      }

      let loading = await this.loadingCtrl.create( { message:"Cargando" } )
      await loading.present();
      this.authService.login(username, password).then( value => {
        loading.dismiss();
        this.navCtrl.navigateRoot('/home');
      } ).catch( err => {
        loading.dismiss();
        this.alertService.presentToast("Usuario o contraseña incorrecta.");
      } );
      
  }

  register(){ 
    this.navCtrl.navigateForward(['/register']);
  }

  dismiss(){
    this.navCtrl.back();
  }

}
