import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tabs/tab1',
    loadChildren: () => import('../app/tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'library-item',
    loadChildren: () => import('./library-item/library-item.module').then( m => m.LibraryItemPageModule)
  },
  {
    path: 'publication',
    loadChildren: () => import('./publication/publication.module').then( m => m.PublicationPageModule)
  },
  {
    path: 'login-method',
    loadChildren: () => import('./login-method/login-method.module').then( m => m.LoginMethodPageModule)
  },
  {
    path: '',
    redirectTo: 'login-method',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
