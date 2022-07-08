import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPerfilPageRoutingModule } from './public-perfil-routing.module';

import {TopBarModule} from '../top-bar/top-bar.module'

import { PublicPerfilPage } from './public-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicPerfilPageRoutingModule,
    TopBarModule
  ],
  declarations: [PublicPerfilPage]
})
export class PublicPerfilPageModule {}
