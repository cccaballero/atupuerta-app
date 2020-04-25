import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private navCtrl:NavController,
  ) { }

  ngOnInit() {
  }

  onAddProduct(){
    this.navCtrl.navigateForward(['/products/add']);
  }

}
