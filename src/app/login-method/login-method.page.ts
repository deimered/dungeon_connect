import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-method',
  templateUrl: './login-method.page.html',
  styleUrls: ['./login-method.page.scss'],
})
export class LoginMethodPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goLoginPage(){
    this.router.navigate(["/login"]);
   }

}
