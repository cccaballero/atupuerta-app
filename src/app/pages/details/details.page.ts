import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Gesture } from '@ionic/core';
import { ChatPage } from '../chat/chat.page';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { FoodsApi } from '../../services/api/foods.api';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import { Foods } from 'src/app/models/Foods';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  @ViewChild('myTextarea', {static:true}) myTextarea: ElementRef;

  ionicGesture: Gesture;
  id:any;
  food:any = {};
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
  };

  paramsComment:any = {};
  comments:any;
  commentText:any;
  commentLimit = 5;
  commentStar:number = 3;
  favorite:boolean;
  cantidad:number = 1;
  timeAgo:any;

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private navCtrl: NavController,
    private alertService: AlertService,
    private authService: AuthService,
    private foodsApi: FoodsApi,
  ) { }

  ngOnInit() {
    TimeAgo.addLocale(es)
    this.timeAgo = new TimeAgo('es-US');

    this.id = this.route.snapshot.paramMap.get('id');
    this.loadDetails();
    this.favorite = true;

    this.paramsComment = {
      "per-page": this.commentLimit,
      page: 1,
      sort:"-updated_at"
    }

    this.iniComments();
  }

  loadDetails(){
    this.foodsApi.foodId( this.id, {} ).subscribe( data => {
      this.food = data;
    },
    err=>{
      this.alertService.presentToast("Error cargando los datos");
    },
    () => {

    })
  }

  iniComments(target=null){
    this.foodsApi.comments( this.id, this.paramsComment ).subscribe( data => {
      if( this.comments == null )
        this.comments = data;
      else
        this.comments = this.comments.concat( data );
      this.paramsComment.page += 1;
      if( target && data.length <= 0 ) target.disabled = true;
    },
    err=>{
      this.alertService.presentToast("Error cargando los comentarios");
    },
    () => {
      if( target ) target.complete();
    })
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
    if( !this.authService.isLoggedIn ){
      this.alertService.presentToast("Necesitas loguearte para hacer comentarios");
      return;
    }

    let params:any = {
      "text": this.commentText,
      "start": this.commentStar,
      "post_id": this.id
    };
    this.foodsApi.createComments( this.id, params, {"fields": "id,createdBy"} ).subscribe( data => {
      params.updated_at =  new Date();
      params.id =  data.id;
      params.createdBy =  data.createdBy;
      if( this.comments == null )
        this.comments = [params];
      else
        this.comments.unshift( params );
        this.commentText = "";
    },
    err=>{
      this.alertService.presentToast("Error cargando los comentarios");
    },
    () => {
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

  loadComments(event){
    this.iniComments(event.target);
  } 

  onClickCardTop(){
    this.navCtrl.navigateForward(['/cart']);
  }

  addCart(){
    this.alertService.presentToast("Añadido al Carrito: ToDo");
  }

  resizeTextarea(){
    this.myTextarea.nativeElement.style.height = this.myTextarea.nativeElement.scrollHeight + 'px';
  }

  transformAgo(time){
    return this.timeAgo.format(new Date(time));
  }
}
