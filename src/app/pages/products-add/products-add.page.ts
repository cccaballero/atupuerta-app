import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.page.html',
  styleUrls: ['./products-add.page.scss'],
})
export class ProductsAddPage implements OnInit {

  id:any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl:NavController,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  dismiss(){
    this.navCtrl.back();
  }

}
