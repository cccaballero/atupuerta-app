import { Component, OnInit, NgZone, ViewChild,Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages:any;
  texto:string;
  id:any;
  isModal:any = false;
  @ViewChild('content', {static:true}) content: any;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private _zone: NgZone,
  ) { 
    
  }

  ionViewWillEnter() {
  }


  ngOnInit() {
    if( !this.isModal )
      this.id = this.route.snapshot.paramMap.get('id');

    this.messages = [
      {
        message: "Hola",
        username: false,
        epoch:"5min"
      },
      {
        message: "Hola",
        username: true,
        epoch:"5min"
      },
      {
        message: "Hola",
        username: false,
        epoch:"5min"
      }
    ];

    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.messages.push( this.messages[0] );
    this.scrollToBottom();
  }

  dismiss() {
    if( this.isModal )
      this.modalCtrl.dismiss();
    else
      this.navCtrl.back();
  }

  send(){
    this.messages.push( {
      message: this.texto,
      username: true,
      epoch:"5min"
    })
    this.scrollToBottom();
    this.texto = "";
  }

  formatEpoch(epoch): string {
    return epoch;
  }

  scrollToBottom() {
    this._zone.run(() => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 100);
    });
  }
}
