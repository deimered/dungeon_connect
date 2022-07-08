import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicPerfilPage } from './public-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPerfilPageRoutingModule {}
