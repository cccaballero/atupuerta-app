import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ImageCacheService } from '../../services/image-cache.service';

@Component({
  selector: 'ion-img-cache',
  templateUrl: './ion-img-cache.component.html',
  styleUrls: ['./ion-img-cache.component.scss'],
})
export class IonImgCacheComponent implements OnInit {

  @Input() src: string = null;
  @Input() category: string = '';

  imgUrl:string = "55";

  constructor(
    private imageCache: ImageCacheService,
  ) {}

  ngOnInit() { 
  }

  ngOnChanges() { 
    this.imageCache.transform( this.src, this.category ).then( newUrl => {
      this.imgUrl = newUrl;
    })
  }

}
