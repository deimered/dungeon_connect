import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../app/tasks';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
import firebase from 'firebase/compat/app';

import {Content} from './classes/content';
import {ContentCharacter} from './classes/contentCharacter';
import {ContentHistory} from './classes/contentHistory';
import {ContentMap} from './classes/contentMap';
import {ContentRule} from './classes/contentRule';
import {Comment} from './classes/comment';



 @Injectable({
  providedIn: 'root'
 })

 export class FireserviceService {
  private snapshotChangesSubscription: any;

  constructor(public af:AngularFirestore,
              public stor:AngularFireStorage,
              private storage: AngularFireStorage){}

  getTasks () {
    //this.af.firestore.collection('users').where("eee", "==", true).get()
    //this.stor.ref
    let currentUser = firebase.auth().currentUser;
    //this.af.collection('people').doc(currentUser.uid).get();
    //this.af.collection('users').doc(currentUser.uid).set(User Object);
    return this.af.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
  }

  createTask(t:Task) {
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('people').doc(currentUser.uid).collection('tasks').add(t);
  }
   
  updateTask(TaskID:any,t:Task){
    let currentUser = firebase.auth().currentUser;
    this.af.collection('people').doc(currentUser.uid).collection('tasks').doc(TaskID).set(t);
    //this.af.doc('tasks/' + TaskID).update(t);
  }
   
  deleteTask(TaskID:any) {
    let currentUser = firebase.auth().currentUser;
    this.af.collection('people').doc(currentUser.uid).collection('tasks').doc(TaskID).delete();
    //this.af.doc('tasks/' + TaskID).delete();
  }

  //Content

  getContents(){
    return this.af.collection('contents').doc('card').collection('content').snapshotChanges();
  }

  /*return this.af.firestore.collection('contents').doc(c.type).collection('content').where("ref", "==", c.$key).get().then(res => {
    res.docs.map(e => {
      return {
        $key: e.id,
        title: e.data()['data']
      }
    }
    )
  });*/

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

  getSubscription(userID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('subscription').doc(userID).get();
  }

  addSubscription(userID: any){
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('users').doc(currentUser.uid).collection('subscription').doc(userID).set({$key:'', ref:userID})
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

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    if (this.snapshotChangesSubscription != undefined)
      this.snapshotChangesSubscription.unsubscribe();
  }
}