import { Injectable } from '@angular/core';
import { Plugin, Capacitor} from '@capacitor/core';
import { ActionPerformed, PushNotificationSchema,
          PushNotifications, Token, } from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private alertCtrl: AlertController,
              private router: Router) { }

  initPush(){
    if (Capacitor.getPlatform() != 'web'){
      this.registerPush();
    }
  }

  registerPush(){
    PushNotifications.requestPermissions().then(permission => {
      if(permission.receive === 'granted'){
        PushNotifications.register();
      } else {
        //this.mostrarAlert('', 'permission not granted');
        // Show some error
      }
    })

    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Token: ' + JSON.stringify(token));
        //this.mostrarAlert('', token.value);
        //alert('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
        //this.mostrarAlert('', error);
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        //this.mostrarAlert('', JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        //this.mostrarAlert('', JSON.stringify(notification));
        const data = notification.notification.data;
        if (data.contentId){
          this.router.navigate([`/tabs/publication/${data.contentId}`]);
        }
      }
    );
  }

  unregisterPush(){
    if (Capacitor.getPlatform() != 'web'){
      PushNotifications.removeAllListeners().then(value =>{},
        err => {this.mostrarAlert("Erro", JSON.stringify(err))})
    }
  }

  async mostrarAlert(titulo, texto) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: texto,
      buttons: [
          {
            text: 'Entendi',
            handler: () => {}
          }
      ]
    });
    await alert.present();
  }
}
