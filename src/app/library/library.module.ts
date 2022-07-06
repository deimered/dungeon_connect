import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TopBarModule} from '../top-bar/top-bar.module'

import { LibraryPageRoutingModule } from './library-routing.module';

import { LibraryPage } from './library.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryPageRoutingModule,
    TopBarModule
  ],
  declarations: [LibraryPage,]
})
export class LibraryPageModule {}
