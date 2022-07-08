import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Content} from '../classes/content';


@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {

  @Input() content: Content;

  constructor(private router: Router) { }

  ngOnInit() {
    this.content.nComments
  }

  goPublicationPage(){
    this.router.navigate([`/tabs/publication/${this.content.$key}`]);
   }

}
