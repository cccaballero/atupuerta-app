import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Filesystem  } = Plugins;
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {

  constructor(
    private platform:Platform,
    private http:HTTP,
    private file:File,
    private storage:NativeStorage,
    ){}

  transform(url: any): any {
    return new Promise(  ( resolve, reject ) => { 
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
      this.http.downloadFile(url, {}, {},this.file.dataDirectory+'yourfile.jpg').then(data => {
        let file = data.toURL();

        this.storage.setItem(url, file).then( dat => {}, err => {});
        
        this.cacheImage( file ).then( dataImageB64 => {
            resolve(dataImageB64);
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
      Filesystem.readFile({ path: file }).then( fileReadResult  => {
          let img = 'data:image/png;base64,'+fileReadResult.data;
          resolve(img);
      }).catch( err => {
          reject(false);
      });
    });
  }
}
