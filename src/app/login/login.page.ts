import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../fireauthservice.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {FcmService} from '../fcm.service';


@Component({
 selector: 'app-login',
 templateUrl: './login.page.html',
 styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
 
 validations_form: FormGroup;
 errorMessage: string = '';
 validation_messages = {
  'email': [
  { type: 'required', message: 'O Email é necessário.' },
  { type: 'pattern', message: 'Coloque um Email válido.' }
  ],
  'password': [
  { type: 'required', message: 'A Password é necessária.' },
  { type: 'minlength', message: 'A Password deve possuir pelo o menos 6 caracteres.'}
  ]
 };

 constructor(
  private authService: FireauthService,
  private formBuilder: FormBuilder,
  private router: Router,
  public alertController: AlertController,
  private notifications: FcmService
  ) { }

 ngOnInit() {
  this.validations_form = this.formBuilder.group({
  email: new FormControl('', Validators.compose([
  Validators.required,
  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),

  password: new FormControl('', Validators.compose([
  Validators.minLength(6),
  Validators.required])),
  });
 }

 tryLogin(value){
  this.authService.doLogin(value).then(res => {
    this.notifications.initPush();
    this.router.navigate(["/tabs"]);}, err => {
    this.showAlert("O Login falhou. Verefique se os dados introduzidos estão corretos.")
  this.errorMessage = err.message;
  console.log(err)
  })
 }

 goRegisterPage(){
  this.router.navigate(["/register"]);
 }

 async showAlert(msg: string) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
