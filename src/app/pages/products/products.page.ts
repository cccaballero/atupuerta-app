import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { FoodsApi } from '../../services/api/foods.api';
import { Foods } from '../../models/Foods';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  subscription:any;

  styleCardContentActive = {
    "border-right-width": "5px",
    "border-right-style": "solid",
    "border-right-color": "green",
    "border-left-width": "5px",
    "border-left-style": "solid",
    "border-left-color": "green"
  }
  styleCardContentDesactive = {
    "border-right-width": "5px",
    "border-right-style": "solid",
    "border-right-color": "red",
    "border-left-width": "5px",
    "border-left-style": "solid",
    "border-left-color": "red"
  }

  params: any;
  foods: Array<Foods> = null;
  limit = 10;

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private navCtrl:NavController,
    private alertService:AlertService,
    private foodsApi:FoodsApi,
  ) { }

  ngOnInit() {
    this.params = {
      page: 1,
      "per-page": this.limit,
      expand:"active",
      sort:"-id"
    };

    this.update();
  }

  update( target=null, load=false ){
    this.foodsApi.my( this.params ).subscribe( 
      data => {
        if( this.foods == null ) 
          this.foods = data;
        else
          this.foods = this.foods.concat(data);

        this.params.page += 1;
        if( load && data.length <= 0 ) target.disabled = true;
      },
      err => {
        this.alertService.presentToast("Error de conexión");
      }, 
      () => {
        if( target ) target.complete();
      });
  }

  doRefresh(event){
    this.params.page = 1;
    this.params["per-page"] = this.limit,
    this.foods = null;
    this.update(event.target);
  }  

  loadData(event){
    this.update(event.target, true);
  }  

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  onAddProduct(){
    this.navCtrl.navigateForward(['/products/add']);
  }

  onClickProduct(item){
    this.navCtrl.navigateForward(['/products/'+item.id]);
  }

  stats(){
    this.alertService.presentToast("Estadistica: ToDo");
  }

  help(){
    this.alertService.presentToast("Ayuda: ToDo");
  }

}
