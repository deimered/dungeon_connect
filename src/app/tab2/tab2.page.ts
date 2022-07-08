import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';
import { FireauthService } from '../fireauthservice.service';
import { Router } from '@angular/router';
import {FireserviceService} from '../fireservice.service'


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  subscriptions: Array<any>;
  users: Array<any> = [];
  currentUser:any = {name:'', imageUrl:''}


  constructor(public fser:FireserviceService,
    public router: Router,
    public authService: FireauthService,) {}

  ngOnInit() {
    this.fser.getSubscriptions().subscribe(data => {
      this.subscriptions = data.map(e => {
        return {
          $key: e.payload.doc.id,
          ref: e.payload.doc.data()['ref']
        }
      });

      this.users = [];

      this.subscriptions.forEach(element => {
        this.fser.getUser(element.ref).subscribe(data => {
          if (!this.users.includes(element)){
            this.users.push({name:data.data()['name'], imageUrl:data.data()['imageUrl'], subID:element.$key})
          }
        });
      });
    });

    this.fser.getCurrentUser().subscribe(data => {
      this.currentUser = {
        $key: data.id,
        name: data.data()['name'],
        imageUrl: data.data()['imageUrl']
      }
    });
  }

  unfollowUser(user){
    this.fser.removeSubscriptions(user.subID).then(
      res => {
        const index = this.users.indexOf(user, 0);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      }
    );
  }

  subscriptionPerfil(user){
    this.router.navigate([`/tabs/public-perfil/${user.subID}`]);
  }

  logout(){
    this.authService.doLogout().then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  } 

}
