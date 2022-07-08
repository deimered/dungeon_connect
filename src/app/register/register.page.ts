import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../fireauthservice.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FcmService } from '../fcm.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'O Email é necessário.' },
      { type: 'pattern', message: 'O Email não é válido.' }
    ],
    'password': [
      { type: 'required', message: 'A Password é necessária.' },
      { type: 'minlength', message: 'A Password deve possuir 6 ou mais caracteres.' }
    ],
    'name': [
      { type: 'required', message: 'O Nome é necessário.' }
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

      name: new FormControl('', Validators.compose([
        Validators.required])),
    });
  }

  tryRegister(value) {
    this.authService.doRegister(value).then(res => {
      this.notifications.initPush();
      this.router.navigate(["/tabs"]);
    }, err => {
      console.log(err);
      this.showAlert('Já existe uma conta associada ao Email introduzido.');
    })
  }

  goLoginPage() {
    this.router.navigate(["/login"]);
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