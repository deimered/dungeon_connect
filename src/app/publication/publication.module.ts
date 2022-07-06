import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TopBarModule} from '../top-bar/top-bar.module'
import {ContentModule} from '../content/content.module'


import { PublicationPageRoutingModule } from './publication-routing.module';

import { PublicationPage } from './publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationPageRoutingModule,
    TopBarModule,
    ContentModule,
  ],
  declarations: [PublicationPage]
})
export class PublicationPageModule {}
