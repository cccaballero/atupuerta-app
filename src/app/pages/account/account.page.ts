import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera  } = Plugins;
import { UsersApi } from '../../services/api/users.api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user:any = {};
  imgUser:string = "./assets/img/prueba3.png";

  constructor(
    private navCtrl:NavController,
    private alertService:AlertService,
    private usersApi: UsersApi,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.iniData();
  }

  iniData(){
    this.usersApi.user( this.authService.token.token, this.authService.token.userId ).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.alertService.presentToast("Error cargando datos") 
      },
      () => {

      }
    )
  }

  update(form){
    this.usersApi.update( this.authService.token.userId, form.value ).subscribe(
      data => {
        this.user = data;
        this.alertService.presentToast("Los datos han sido guardados correctamente") 
      },
      err => {
        this.alertService.presentToast("Error actualizando los datos") 
      },
      () => {

      }
    )
  }

  onClickCardTop(){
    this.navCtrl.navigateForward(['/cart']);
  }

  onCamera(){
    Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      correctOrientation:true,
      saveToGallery:true,
      source:CameraSource.Prompt,
      width:100
    }).then( image => {
      this.imgUser = image.dataUrl;
    } ).catch( err => this.alertService.presentToast("Camara: Error") );
  }

  changePassword(){
    this.alertService.presentToast("Cambio de contraseña: ToDo");
  }
}
