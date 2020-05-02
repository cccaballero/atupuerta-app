import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Config } from './../../../config';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {

  imgUser = './assets/img/defaultUser.jpg';
  imgFood = './assets/img/defaultFood.png';
  imgDefault= './assets/img/notimage.jpg';

  constructor(
    private platform:Platform,
    private http:HTTP,
    private file:File,
    private storage:NativeStorage,
    private config:Config,
    ){}

  transform(url: string, category:string=""): any { 
    return new Promise(  ( resolve, reject ) => { 
      if( !url || url == ""){
        if( category == "user" ) 
          return resolve( this.imgUser );
        if( category == "food" )
          return resolve( this.imgFood );
        
          return resolve( this.imgDefault );
      }

      if( url.match(/^data:image/) )
        return resolve( url );

      url = this.config.url + '/' + url;

      if( !this.platform.is('cordova') )
          return resolve( url );
      
      this.storage.getItem(url).then( file => {
        this.cacheImage(file).then( dat => { 
            resolve( dat );
        },err => {
            resolve( url );
        } );
      },
      err => {
        this.saveImage(url).then( dat => { 
            resolve( dat );
        },err => { 
            resolve( url );
        });
      });
    });
  }

  saveImage( url ){
    return new Promise(  ( resolve, reject ) => { 
      let nameFile = Date.now() + '.jpg';
      this.http.downloadFile(url, {}, {},this.file.dataDirectory+nameFile).then(data => {
        let file = data.toURL();

        this.storage.setItem(url, file).then( dat => {}, err => {});
        
        this.cacheImage( file ).then( dataImageB64 => {
            resolve(dataImageB64);
            console.log("iimmgg", dataImageB64);
        },err => {
            reject(false);
        });

      }, (error) => {
          reject(false);
      });
    });
  }

  cacheImage( file ){
    return new Promise(  ( resolve, reject ) => { 
      resolve(Capacitor.convertFileSrc( file ));
    });
  }
}
