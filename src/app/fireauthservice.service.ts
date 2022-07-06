import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { FireserviceService } from './fireservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class FireauthService {
  
 constructor(private firebaseService: FireserviceService,
             public afAuth: AngularFireAuth){}

 doRegister(value){
  return new Promise<any>((resolve, reject) => {
    this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(
      res => {this.firebaseService.addUser({uid: res.user.uid, displayName:value.name, photoURL:''});
              resolve(res);
            },
      err => reject(err))
    })
 }

 doLogin(value){
  return new Promise<any>((resolve, reject) => {
    this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
      res => resolve(res),
      err => reject(err))
  })
 }

 doLogout(){
  return new Promise((resolve, reject) => {
    this.afAuth.signOut().then(() => {
      this.firebaseService.unsubscribeOnLogOut();
      resolve(undefined);
    }).catch((error) => {
      console.log(error);
      reject();
    });
  })
 }
}