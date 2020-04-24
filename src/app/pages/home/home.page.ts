import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  subscription:any;

  constructor(
    private platform: Platform,
    private navCtrl:NavController
  ) { }

  @ViewChild('slidesCat', { static: true }) slidesCat: IonSlides;

  slideHomeOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop:true
  };

  slideCategoriasOpts = {
    initialSlide: 0,
    slidesPerView: 3
  };

  styleCatActive = { "box-shadow": "1px 1px 5px 1px #feb92f"};

  categorias = [
    {
      title:"Filete",
      style:{}
    },
    {
      title:"Pizza",
      style:{}
    },
    {
      title:"Pollo",
      style:{}
    }
  ]

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

  background(){
    return {
      "background-image" : "url(./assets/img/prueba3.png)",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "cover",
    };
  }

  backgroundCat(item){
    return {
      "background-image" : "url(./assets/img/prueba"+item+".png)"
    };
  }


  slideCatPrev(){
    this.slidesCat.slidePrev();
  }

  slideCatNext2(){
    this.slidesCat.slideNext();
  }

  onClickCat(titleCat){
    this.categorias = this.categorias.map( x => { 
      x.style = ( x.title == titleCat && x.style != this.styleCatActive )?this.styleCatActive:{}; 
      console.log
      return x; 
    });

    let sel = this.categorias.filter( x => x.style != {} );
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
    console.log("toCart");
  }

  onSwipeLeft(item){
    console.log(item);
  }

  onSwipeRight(item){
    console.log(item);
  }
}
