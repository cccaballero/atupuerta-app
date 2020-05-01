import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { ChatPageModule } from '../chat/chat.module';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    ChatPageModule
  ],
  exports:[TimeAgoPipe],
  declarations: [DetailsPage, TimeAgoPipe],
  entryComponents: [],
})
export class DetailsPageModule {}
