import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthApi } from './api/auth.api';
import { Config } from './../../../config';
import { BehaviorSubject, Subject } from 'rxjs';
import { ImageCacheService } from './image-cache.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  username:string = "Invitado";
  profilePicture:string = null;

  public isLoggedInObs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoggedInSubject:Subject<any> = new Subject<any>();

  constructor(
    private storage: NativeStorage,
    private authApi: AuthApi,
    private config: Config,
    private imageCache: ImageCacheService,
  ) { 
   }

  login(username: string, password: string) {
    let self = this;
    return new Promise( (resolve, reject) => {
      self.authApi.login( username, password ).subscribe(
        data => {
            if( data && data.token ){
                self.token = data;
                this.isLoggedInSubject.next(self.isLoggedIn != true)
                self.isLoggedIn = true;
                self.username = username

                self.profilePicture = data.profile_picture;
                
                data.username = username
                
                self.storage.setItem('token', data)
                .then(
                  () => {
                    console.log('Token Stored');
                  },
                  error => console.error('Error storing item: Token', error)
                ); 
                return resolve(true);
            }

            return resolve(false);
          },
          error => {
            console.log(error); 
            return reject(false)
          },() => {
              return reject(false)
          });
    });
  }

  register(params) {
    return new Promise( (resolve, reject) => {
      this.authApi.register( params, {fields:'id'} ).subscribe(
        data => {
          resolve(true);
        },
        error => {
          reject(false);
        },
        () => {
          
        }
      );
    });
  }

  logout() {
        this.storage.remove("token");
        this.storage.remove("user");
        delete this.token;
        this.isLoggedInSubject.next(this.isLoggedIn != false)
        this.isLoggedIn = false;
        this.username = "Invitado";

        this.profilePicture = null;

        return { message:"logout ok" };
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        this.username = data.username;

        this.profilePicture = data.profile_picture;

        if(this.token != null ) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

  editPhotoPerfil( img ){
    this.profilePicture = img;
    this.token.profile_picture = img;
    this.storage.setItem('token', this.token)
    .then(
      () => {
        console.log('Token Stored1');
      },
      error => console.error('Error storing item: Token1', error)
    ); 
  }

  getAuthorization( ){
    if( !this.token ) return null;

    if( this.token.expiration && new Date(this.token.expiration).getTime() > Date.now() )
      return "Bearer "+ this.token.token;

    return null;
  }
}
