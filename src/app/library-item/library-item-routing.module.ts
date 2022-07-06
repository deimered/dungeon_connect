import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryItemPage } from './library-item.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryItemPageRoutingModule {}
