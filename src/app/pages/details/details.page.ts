import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Gesture } from '@ionic/core';
import { ChatPage } from '../chat/chat.page';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  ionicGesture: Gesture;
  id:any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
  };

  comments:any;
  commentText:any;
  commentStar:number = 3;
  favorite:boolean;
  cantidad:number = 1;

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private navCtrl: NavController,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.favorite = true;
    this.comments = [{
      name:"Juan Perez Perez",
      text:"El plato es muy bueno. El plato es muy bueno.El plato es muy bueno.El plato es muy bueno.El plato es muy bueno.",
      date:"21:46 22/04/2020",
      star:3
    }]
    this.comments.push( this.comments[0] );
    this.comments.push( this.comments[0] );
  }

  background(){
    return {
      "background-image" : "url(./assets/img/prueba3.png)",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "cover",
    };
  }

  dismissDetails() {
    this.navCtrl.back();
  }

  sendComment(){
    this.comments.unshift({
      name:"User Prueba Prueba",
      text:this.commentText,
      date: new Date().toJSON(),
      star:this.commentStar
    })
  }

  styleStar(fontSize, value, i){
    return {
      "font-size": fontSize+"px",
      "color": ( value >= i ) ? "#feb92f" : "#92949c"
    }
  }


  async message(){
    const chatModal = await this.modalController.create({
      component: ChatPage,
      cssClass: "modalChat",
      componentProps: { 
        id:5,
        isModal:true
      }
    });
    return await chatModal.present();
  }

  onPan(event){
    console.log(event);
  }

  onFavorite(){
    this.favorite = !this.favorite;
  }

  loadComment(event){
    setTimeout( ()=> event.target.complete(), 1000); 
  } 

  onClickCardTop(){
    this.navCtrl.navigateForward(['/cart']);
  }

  addCart(){
    this.alertService.presentToast("Añadido al Carrito: ToDo");
  }
}
