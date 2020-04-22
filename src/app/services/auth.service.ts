import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;

  constructor(
    // private storage: NativeStorage
  ) { }

  login(username: string, password: string) {
    let self = this;
    return new Promise( (resolve, reject) => {
        self.token = "token";
        self.isLoggedIn = true;
        return resolve(true);
    });
  }

  register(fName: String, lName: String, email: String, password: String) {
    return true;
  }

  logout() {
        // this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return { message:"logout ok" };
  }

  user() {
  }

  getToken() {
  //   return this.storage.getItem('token').then(
  //     data => {
  //       this.token = data;
  //       this.userName = this.token.userName;

  //       if(this.token != null && this.userName ) {
  //         this.isLoggedIn=true;
  //       } else {
  //         this.isLoggedIn=false;
  //       }
  //     },
  //     error => {
  //       this.token = null;
  //       this.isLoggedIn=false;
  //     }
  //   );
  }
}
