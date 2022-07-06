import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule, SETTINGS } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule  } from "@angular/fire/compat/database";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TopBarModule} from '../app/top-bar/top-bar.module'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyA6csnJaook2SAPVfD69mVFjz5tLoRLQ7Y",
  authDomain: "ami-lab-a46348.firebaseapp.com",
  projectId: "ami-lab-a46348",
  storageBucket: "ami-lab-a46348.appspot.com",
  messagingSenderId: "605505859595",
  appId: "1:605505859595:web:a93c127c6b93566265970e",
  measurementId: "G-DXJ12CX5D6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule, 
    ReactiveFormsModule,
    TopBarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              { provide: SETTINGS, useValue: {} }],
  bootstrap: [AppComponent], 
})
export class AppModule {}
