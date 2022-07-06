import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TopBarModule} from '../top-bar/top-bar.module'
import {ContentModule} from '../content/content.module'


import { LibraryItemPageRoutingModule } from './library-item-routing.module';

import { LibraryItemPage } from './library-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryItemPageRoutingModule,
    TopBarModule,
    ContentModule
  ],
  declarations: [LibraryItemPage,]
})
export class LibraryItemPageModule {}
