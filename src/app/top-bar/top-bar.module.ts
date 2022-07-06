import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TopBarComponent} from './top-bar.component';
@NgModule({
  imports: [
    IonicModule,
  ],
  declarations: [
    TopBarComponent,
  ],
  exports: [
    TopBarComponent,
  ]
})
export class TopBarModule { }
