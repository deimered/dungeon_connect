import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';  


import { ContentComponent} from './content.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [
    ContentComponent,
  ],
  exports: [
    ContentComponent,
  ]
})
export class ContentModule { }
