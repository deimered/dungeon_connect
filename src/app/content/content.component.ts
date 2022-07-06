import { Component, OnInit, Input } from '@angular/core';
import {Content} from '../classes/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  
  @Input() content: Content;
  @Input() contentInformation: any;


  constructor() { }

  ngOnInit() {}

}
