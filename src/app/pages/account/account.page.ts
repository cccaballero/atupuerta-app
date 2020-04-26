import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  username:string = "prueba";

  constructor(
    private navCtrl:NavController,
    private alertService:AlertService,
  ) { }

  ngOnInit() {
  }

  register(form){
    console.log(form.value);
  }

  onClickCardTop(){
    this.navCtrl.navigateForward(['/cart']);
  }

  onCamera(){
    this.alertService.presentToast("Camara: ToDo");
  }

  changePassword(){
    this.alertService.presentToast("Cambio de contraseña: ToDo");
  }
}
