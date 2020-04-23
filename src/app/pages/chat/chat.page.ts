import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages:any;
  texto:string;
  @ViewChild('content', {static:true}) content: any;

  constructor(
    private modalController: ModalController,
    private _zone: NgZone,
  ) { 
  }

  ionViewWillEnter() {
  }


  ngOnInit() {
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
    this.modalController.dismiss();
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
