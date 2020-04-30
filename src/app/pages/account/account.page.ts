import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera  } = Plugins;
import { UsersApi } from '../../services/api/users.api';
import { AuthService } from '../../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { from } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user:any = {};
  imgUser:string = "./assets/img/prueba3.png";
  loadingIni:any;

  constructor(
    private navCtrl:NavController,
    private loadingCtrl:LoadingController,
    private alertService:AlertService,
    private storage: NativeStorage,
    private usersApi: UsersApi,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.iniData();
  }

  async iniData(){
    this.loadingIni = await this.loadingCtrl.create( { message:"Cargando" } )
    await this.loadingIni.present();

    this.storage.getItem('user')
    .then(
      data => {
        this.loadingIni.dismiss();
        this.user = data;
      },
      error => { 
        this.loadRemote();
        console.error('Error get storing item: User', error)
      }
    );
  }

  loadRemote(){
    this.usersApi.user( this.authService.token.userId, { 
      expand:'username,firstname,lastname,email,phone_number,movil_number' 
    }).subscribe(
      data => {
        this.loadingIni.dismiss();

        if( !data.profile_picture )
          data.profile_picture = this.imgUser;

        this.user = data;
        this.setUserStoring( data );
      },
      err => {
        this.loadingIni.dismiss();
        this.alertService.presentToast("Error cargando datos") 
      },
      () => {

      }
    )
  }

  setUserStoring(data){
    this.storage.setItem('user', data)
    .then(
      () => {
        console.log('Token Stored User');
      },
      error => console.error('Error storing item: User', error)
    ); 
  }

  async update(form:any){
    let loading = await this.loadingCtrl.create( { message:"Cargando" } )
    await loading.present();
    let params:any = form.value;
    params.profile_picture = this.user.profile_picture;
    this.usersApi.update( this.authService.token.userId, params, {fields:'id'} ).subscribe(
      data => {
        this.setUserStoring( this.user );
        loading.dismiss();
        this.alertService.presentToast("Los datos han sido guardados correctamente");
      },
      err => {
        loading.dismiss();
        this.alertService.presentToast("Error actualizando los datos"); 
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
      this.user.profile_picture  = image.dataUrl;
    } ).catch( err => this.alertService.presentToast("Camara: Error") );
  }

  changePassword(){
    this.navCtrl.navigateForward(['/changepassword']);
  }
}
