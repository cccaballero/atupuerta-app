import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsAddPageRoutingModule } from './products-add-routing.module';

import { ProductsAddPage } from './products-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsAddPageRoutingModule
  ],
  declarations: [ProductsAddPage]
})
export class ProductsAddPageModule {}
