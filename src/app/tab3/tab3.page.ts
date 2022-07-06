import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { Content } from '../classes/content';
import {ContentCharacter} from '../classes/contentCharacter';
import {ContentHistory} from '../classes/contentHistory';
import {ContentMap} from '../classes/contentMap';
import {ContentRule} from '../classes/contentRule';

import {FireserviceService} from '../fireservice.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  validations_form: FormGroup;
  validations_form_his_rule: FormGroup;
  validations_form_char: FormGroup;
  type:string = "historia";
  isImageChoosen:boolean;
  ready:boolean= true;
  file: any;

  constructor(private formBuilder: FormBuilder,
              public fser:FireserviceService,
              public alertController: AlertController){}

  ngOnInit(){
    this.validations_form_char = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
      Validators.required])),

      name: new FormControl('', Validators.compose([
      Validators.required])),

      class: new FormControl('', Validators.compose([
      Validators.required])),

      race: new FormControl('', Validators.compose([
      Validators.required])),

      str: new FormControl('', Validators.compose([
      Validators.required])),

      dex: new FormControl('', Validators.compose([
      Validators.required])),

      cos: new FormControl('', Validators.compose([
      Validators.required])),

      int: new FormControl('', Validators.compose([
      Validators.required])),

      wis: new FormControl('', Validators.compose([
      Validators.required])),

      car: new FormControl('', Validators.compose([
      Validators.required])),

      ht: new FormControl('', Validators.compose([
      Validators.required])),

      mov: new FormControl('', Validators.compose([
      Validators.required])),
    });

    this.validations_form_his_rule = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
      Validators.required])),
      
      text: new FormControl('', Validators.compose([
      Validators.required])),
    });

    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
      Validators.required])),
    });
  }

  chooseFile(event: EventTarget){
    const files = (event as HTMLInputElement).files;
    if (files.length != 0 && files.item(0).type.split('/')[0] === 'image'){
      this.file = files.item(0);
      this.isImageChoosen = true;
    }
    else{
      this.isImageChoosen = false;
      this.file = undefined;
    }   
  }

  uploadImage(){
    const inputButton = document.getElementById('inputFile');
    if (inputButton != undefined){
      inputButton.click();
    }
  }

 publishHistory(c:Content, value){
  this.fser.createContent(c).then(resp => {
    console.log("publishHistory: then - " +resp);
    let contentHistory: ContentHistory = {
      $key: '',
      user: '',
      ref: resp.id,
      history: value.text,}
    
    this.fser.createContentHistory(contentHistory, c).then(resp => {
      this.showAlert("A história foi publicada.");
    }).catch(error => {
      this.showAlert("Aconteceu um erro durante a publicação.");
      });

  }).catch(error => {
    console.log("publishHistory: catch - " +error);
    this.showAlert("Aconteceu um erro durante a publicação.");
    });
 }

 publishRule(c:Content, value){
  this.fser.createContent(c).then(resp => {
    console.log("publishRule: then - " +resp);
    let contentRule: ContentRule = {
      $key: '',
      user: '',
      ref: resp.id,
      rule: value.text,}
    
    this.fser.createContentRule(contentRule, c).then(resp => {
      this.showAlert("A regra foi publicada.");
    }).catch(error => {
      this.showAlert("Aconteceu um erro durante a publicação.");
      });

  }).catch(error => {
    console.log("publishRule: catch - " +error);
    this.showAlert("Aconteceu um erro durante a publicação.");
    });
 }

 publishCharacter(c:Content, value){
  this.fser.createContent(c).then(resp => {
    console.log("publishCharacter: then - " +resp);
    let contentCharacter: ContentCharacter = {
      $key: '',
      user: '',
      ref: resp.id,
      name: value.name,
      job: value.class,
      race: value.race,
      str: value.str,
      dex: value.dex,
      cos: value.cos,
      int: value.int,
      wis: value.wis,
      car: value.car,
      ht: value.ht,
      mov: value.mov,}

    this.fser.createContentCharacter(contentCharacter, c).then(resp => {
      this.showAlert("A ficha foi publicada.");
    }).catch(error => {
      this.showAlert("Aconteceu um erro durante a publicação.");
      });

  }).catch(error => {
    console.log("publishCharacter: catch - " +error);
    this.showAlert("Aconteceu um erro durante a publicação.");
    });
 }

 publishMap(c:Content){
  this.fser.createContent(c).then(resp => {
    console.log("publishMap: then - " +resp);
    let contentMap: ContentMap = {
      $key: '',
      user: '',
      ref: resp.id,}
    
    this.fser.createContentMap(contentMap, c).then(resp => {
      this.showAlert("O mapa foi publicado.");
    }).catch(error => {
      this.showAlert("Aconteceu um erro durante a publicação.");
      });

  }).catch(error => {
    console.log("publishMap: catch - " +error);
    this.showAlert("Aconteceu um erro durante a publicação.");
    });
 }

 tryPublish(value){
  this.ready = false;
  const ref = this.fser.generateImageRef();
  const storageRef = this.fser.getStoreImageRef(ref);
  this.fser.storeImage(this.file, ref).subscribe(data =>{

    storageRef.getDownloadURL().subscribe(url =>{

      let content:Content = {$key: '',
        title: value.title,
        type: this.type,
        nLikes: 0,
        nDislikes: 0,
        nComments: 0,
        imageUrl: url,};
        
      switch(this.type){
        case 'historia':
          this.publishHistory(content, value);
          break;
        case 'regra':
          this.publishRule(content, value);
          break;
        case 'ficha':
          this.publishCharacter(content, value);
          break;
        case 'mapa':
          this.publishMap(content);
          break;
        }
    })
  })
 }

  async showAlert(msg: string) {
    this.ready = true;
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
