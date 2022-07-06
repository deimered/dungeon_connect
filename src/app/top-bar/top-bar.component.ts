import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit() {}

  goBack(){
    this.location.back();
  }

  search(){
    this.router.navigate(["/tabs/tab1"]);
  }
}
