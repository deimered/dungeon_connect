import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FireserviceService} from '../fireservice.service'
import {Content} from '../classes/content';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  libraryItens: Array<any>;
  contents: Array<Content> = [];

  constructor(private router: Router,
              public fser:FireserviceService) { }

  ngOnInit() {
    this.fser.getLibrary().subscribe(data => {
      this.libraryItens = data.map(e => {
        return {
          $key: e.payload.doc.id,
          ref: e.payload.doc.data()['ref']
        }
      });
      
      this.contents = [];

      this.libraryItens.forEach(element => {
        this.fser.getContent(element.ref).subscribe(data => {
          if (this.contents.find(cont => cont.$key == data.id) == undefined){

            this.contents.push({
              $key: data.id,
              title: data.data()['title'],
              type: data.data()['type'],
              nLikes: data.data()['nLikes'],
              nDislikes: data.data()['nDislikes'],
              nComments: data.data()['nComments'],
              imageUrl: data.data()['imageUrl'],})
          }
        });
      });
    });
  }

  goLibraryItemPage(content:Content){
    this.router.navigate([`/tabs/library-item/${content.$key}`]);
   }

}
