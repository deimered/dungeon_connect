import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'library',
        loadChildren: () => import('../library/library.module').then( m => m.LibraryPageModule)
      },
      {
        path: 'library/:id',
        loadChildren: () => import('../library/library.module').then( m => m.LibraryPageModule)
      },
      {
        path: 'library-item',
        loadChildren: () => import('../library-item/library-item.module').then( m => m.LibraryItemPageModule)
      },
      {
        path: 'library-item/:id',
        loadChildren: () => import('../library-item/library-item.module').then( m => m.LibraryItemPageModule)
      },
      {
        path: 'publication',
        loadChildren: () => import('../publication/publication.module').then( m => m.PublicationPageModule)
      },
      {
        path: 'publication/:id',
        loadChildren: () => import('../publication/publication.module').then( m => m.PublicationPageModule)
      },
      {
        path: 'public-perfil/:id',
        loadChildren: () => import('../public-perfil/public-perfil.module').then( m => m.PublicPerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
