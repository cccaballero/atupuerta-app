import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private navCtrl:NavController,
    private alertService:AlertService,
  ) { }

  ngOnInit() {
  }

  doRefresh(event){
    event.target.complete();
  }  

  loadData(event){
    setTimeout( ()=> event.target.complete(), 1000); 
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
    this.navCtrl.navigateForward(['/products/'+item]);
  }

  stats(){
    this.alertService.presentToast("Estadistica: ToDo");
  }

  help(){
    this.alertService.presentToast("Ayuda: ToDo");
  }

}
