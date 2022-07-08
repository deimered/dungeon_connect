import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
import firebase from 'firebase/compat/app';

import {Content} from './classes/content';
import {ContentCharacter} from './classes/contentCharacter';
import {ContentHistory} from './classes/contentHistory';
import {ContentMap} from './classes/contentMap';
import {ContentRule} from './classes/contentRule';


 @Injectable({
  providedIn: 'root'
 })

 export class FireserviceService {
  private snapshotChangesSubscription: Array<any> = [];

  constructor(public af:AngularFirestore,
              public stor:AngularFireStorage,
              private storage: AngularFireStorage){}

  //Content

  getContents(){
    this.snapshotChangesSubscription.push(this.af.collection('contents').doc('card').collection('content').snapshotChanges())
    return this.snapshotChangesSubscription[this.snapshotChangesSubscription.length - 1];
  }

  getContent(contentID){
    return this.af.collection('contents').doc('card').collection('content').doc(contentID).get();
  }

  getContentInformation(c:Content){
    return this.af.firestore.collection('contents').doc(c.type).collection('content').where("ref", "==", c.$key).get();
  }

  createContent(c:Content){
    return this.af.collection('contents').doc('card').collection('content').add(c);
  }

  createContentMap(cm:ContentMap, c:Content){
    //Não esquecer de adicionar o id do createContent a este conteudo!!!
    cm.user = firebase.auth().currentUser.uid;
    return this.af.collection('contents').doc(c.type).collection('content').add(cm);
  }

  createContentRule(cr:ContentRule, c:Content){
    cr.user = firebase.auth().currentUser.uid;
    return this.af.collection('contents').doc(c.type).collection('content').add(cr);
  }

  createContentCharacter(cc:ContentCharacter, c:Content){
    cc.user = firebase.auth().currentUser.uid;
    return this.af.collection('contents').doc(c.type).collection('content').add(cc);
  }

  createContentHistory(ch:ContentHistory, c:Content){
    ch.user = firebase.auth().currentUser.uid;
    return this.af.collection('contents').doc(c.type).collection('content').add(ch);
  }

  getComments(c:Content){
    return this.af.collection('contents').doc(c.$key).collection('comment').snapshotChanges();
  }

  generateImageRef(){
    let currentUser = firebase.auth().currentUser;
    return `uploads/${currentUser.uid}_${new Date().getTime()}`
  }

  getStoreImageRef(path: string){
    return this.storage.ref(path);
  }

  storeImage(file: any, storagePath: string){
    const uploadTask = this.storage.upload(storagePath, file);
    return uploadTask.snapshotChanges();
  }

  //Subscrições

  getSubscriptions(){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('subscription').snapshotChanges();
  }

  addContentRef(contentID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('publications').doc(contentID).set({$key:'', ref:contentID});
  }

  getContentUser(userID: any){
    return this.af.collection('users').doc(userID).collection('publications').snapshotChanges();
  }

  getSubscription(userID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('subscription').doc(userID).get();
  }

  addSubscription(userID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('subscription').doc(userID).set({$key:'', ref:userID});
  }

  removeSubscriptions(subID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('subscription').doc(subID).delete();
  }

  //Biblioteca

  getLibrary(){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('library').snapshotChanges();
  }

  getLibraryItem(contentID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('library').doc(contentID).get();
  }

  addLibrary(contentID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('library').doc(contentID).set({$key:'', ref:contentID});
  }

  removeLibrary(libID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('library').doc(libID).delete();
  }

  //Users

  getUser(userID: any){
    return this.af.collection('users').doc(userID).get();
  }

  getCurrentUser(){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).get();
  }

  addUser(user: any){
    return this.af.collection('users').doc(user.uid).set({name:user.displayName, imageUrl:user.photoURL})
  }

  //Save subscriptions

  saveSubscriptions(sub: any){
    this.snapshotChangesSubscription.push(sub);
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    if (this.snapshotChangesSubscription != undefined)
      console.log("www");
      //for (let i = 0; i <= this.snapshotChangesSubscription.length; i++){
        //this.snapshotChangesSubscription[i].unsubscribe();
      //}
      
  }
}