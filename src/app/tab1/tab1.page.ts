import { Component } from '@angular/core';
import {Content} from '../classes/content';
import {FireserviceService} from '../fireservice.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  contents: Array<Content>;
  contentsAux: Array<Content>;
  idx: number;
  disableInfiniteScrolling: boolean;

  constructor(public fser:FireserviceService) {}

  ngOnInit() {
    this.fser.getContents().subscribe(data => {
      this.disableInfiniteScrolling = false;
      this.idx = 0;
      this.contentsAux = []
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
      //console.log(this.contents);
      for(let i = 0; i < this.contents.length; i++){
        this.contentsAux.push(this.contents[i]);
        this.idx += 1;
        if (this.idx == 3)
          break;
      }
    });
  }

  ionViewWillEnter() {
    
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      const dist = (this.contents.length - this.contentsAux.length) >= 3 ? 3 : this.contents.length - this.contentsAux.length;

      for(let i = 0; i < dist; i++){
        this.contentsAux.push(this.contents[this.idx + i]);
      }

      this.idx += 3;

      if (this.contentsAux.length === this.contents.length) {
        this.disableInfiniteScrolling = true;
      }
    }, 500);
  }

}
