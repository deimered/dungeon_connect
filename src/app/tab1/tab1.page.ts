import { Component } from '@angular/core';
import {Content} from '../classes/content';
import {FireserviceService} from '../fireservice.service'



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  contents: Array<Content> = [];

  icon_benfica : string ="https://cdn.worldvectorlogo.com/logos/benfica.svg";

  constructor(public fser:FireserviceService) {}

  ngOnInit() {
    this.fser.getContents().subscribe(data => {
      this.contents = data.map(e => {
        return {
          $key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          type: e.payload.doc.data()['type'],
          nLikes: e.payload.doc.data()['nLikes'],
          nDislikes: e.payload.doc.data()['nDislikes'],
          nComments: e.payload.doc.data()['nComments'],
          imageUrl: e.payload.doc.data()['imageUrl'],
        };
      });
      console.log(this.contents);
    });
    /*this.contents.push({$key: '111',
                        title: 'eppep',
                        type: 'mapa',
                        nLikes: 6,
                        nDislikes:6,
                        nComments:6,
                        imageUrl: this.icon_benfica});*/
  }

}
