import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Camera, Filesystem  } = Plugins;
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  username:string = "prueba";
  imgUser:string = "./assets/img/prueba3.png";

  constructor(
    private navCtrl:NavController,
    private alertService:AlertService,
    private transfer: FileTransfer,
    private http: HTTP,
  ) { }

  ngOnInit() {
  }

  register(form){
    this.http.downloadFile(form.value.firstname, {}, {}, FilesystemDirectory.Data + '/yourfile.jpg').then(data => {
      // Filesystem.writeFile({
      //   path: 'yourfile.jpg',
      //   data: data.data,
      //   directory: FilesystemDirectory.Data,
      //   encoding: FilesystemEncoding.UTF8
      // }).then( value => {
        Filesystem.readFile({ path: data.toURL() }).then( fileReadResult  => {
          this.alertService.presentToast(JSON.stringify(fileReadResult.data));
          this.imgUser = 'data:image/png;base64,'+fileReadResult.data;
        }).catch( err => {
          this.alertService.presentToast("Error Read: " + JSON.stringify(err));
        });
      // }).catch( e => {
      //   this.alertService.presentToast("Error: " + JSON.stringify(e));
      // });
      this.alertService.presentToast("OK: download " + JSON.stringify(data.toURL()));
    }, (error) => {
      this.alertService.presentToast("Error: download " + JSON.stringify(error));
    });
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
