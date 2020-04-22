
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EatItemComponent } from './eat-item/eat-item.component';


@NgModule({
  declarations: [EatItemComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
      CommonModule ,
      IonicModule
  ],
  exports: [EatItemComponent]
})
export class ComponentsModule {}
