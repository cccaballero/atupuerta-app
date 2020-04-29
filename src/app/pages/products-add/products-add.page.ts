import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { FoodsApi } from '../../services/api/foods.api';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera  } = Plugins;

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.page.html',
  styleUrls: ['./products-add.page.scss'],
})
export class ProductsAddPage implements OnInit {

  @ViewChild('myTextarea', {static:true}) myTextarea: ElementRef;
  id:any;
  food:any = {};

  constructor(
    private route: ActivatedRoute, 
    private navCtrl:NavController,
    private authService:AuthService,
    private alertService:AlertService,
    private foodsApi:FoodsApi,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if( this.id == "add" )
      this.food['created_by'] = this.authService.token.userId;
    else
      this.loadDetails();
  }

  loadDetails(){
    this.foodsApi.foodId( this.id, { sort:"created_at" } ).subscribe( data => {
      this.food = data;
    },
    err=>{
      this.alertService.presentToast("Error cargando los datos");
    },
    () => {

    })
  }

  dismiss(){
    this.navCtrl.back();
  }

  background(){
    return {
      "background-image" : "url(./assets/img/prueba3.png)",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "cover",
    }; 
  }

  action(form){
    if( this.id == "add" )
      this.create();
    else
      this.edit();
  }

  create(){
    this.foodsApi.create( this.food, {fields:'id'} ).subscribe( data => {
      this.navCtrl.back();
      this.alertService.presentToast("Producto creado exitosamente");
    },
    err=> {
      this.alertService.presentToast("Error creando producto");
    }, 
    () => {

    });
  }

  edit(){
    this.foodsApi.edit( this.id, this.food ).subscribe( data => {
      this.navCtrl.back();
      this.alertService.presentToast("Producto editado exitosamente");
    },
    err=> {
      this.alertService.presentToast("Error editando producto");
    }, 
    () => {

    });
  }

  onDeleteImg(item){

  }

  onGallery(){
    this.onPhoto(CameraSource.Photos);
  }

  onCamera(){
    this.onPhoto(CameraSource.Camera);
  }

  onPhoto(source){
    Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      correctOrientation:true,
      saveToGallery:true,
      source:source,
      width:100
    }).then( image => {
      // this.imgUser = image.dataUrl; ///data:base64...
    } ).catch( err => this.alertService.presentToast("Camara: Error") );
  }

  resizeTextarea(){
    this.myTextarea.nativeElement.style.height = this.myTextarea.nativeElement.scrollHeight + 'px';
  }
}
