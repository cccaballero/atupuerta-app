import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  subscription:any;

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private navCtrl:NavController,
  ) { }

  ngOnInit() {
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

}
