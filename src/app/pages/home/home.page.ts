import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

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

  categorias = [
    {
      title:"Filete"
    },
    {
      title:"Pizza"
    },
    {
      title:"Pollo"
    }
  ]

  ngOnInit() {
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

}
