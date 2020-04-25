import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  subscription:any;

  constructor(
    private platform: Platform,
    private navCtrl:NavController
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

  onClickProduct(item){
    this.navCtrl.navigateForward(['/details/'+item]);
  }

  doRefresh(event){
    event.target.complete();
  }  

  loadData(event){
    setTimeout( ()=> event.target.complete(), 1000); 
  }  

  onClickCardTop(){
    this.navCtrl.navigateForward(['/cart']);
  }

  onSwipeLeft(item){
    console.log(item);
  }

  onSwipeRight(item){
    console.log(item);
  }

}
