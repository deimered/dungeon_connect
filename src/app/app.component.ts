import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public platform: Platform,
  ) {}

  ngOnInit() {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
      if(user){
        this.router.navigate(["/tabs"]);
      } else {
        this.router.navigate(["/login-method"]);
      }
      }, err => {
        this.router.navigate(["/login-method"]);
      }, () => {
        //this.splashScreen.hide();
      })
    //this.statusBar.styleDefault();
    });
  }
}
