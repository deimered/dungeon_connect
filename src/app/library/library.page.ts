import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service'
import { Content } from '../classes/content';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  libraryItens: Array<any>;
  contents: Array<Content> = [];
  searchType: string;
  subscriptionItens: Subscription;
  subscriptionsContent: Array<Subscription> = [];

  constructor(private router: Router,
    public fser: FireserviceService,
    private route: ActivatedRoute,) { }

    ngOnInit() {
    this.subscriptionItens = this.fser.getLibrary().subscribe(data => {
      this.searchType = this.route.snapshot.paramMap.get('id');

      this.libraryItens = data.map(e => {
        return {
          $key: e.payload.doc.id,
          ref: e.payload.doc.data()['ref']
        }
      });

      this.contents = [];

      this.libraryItens.forEach(element => {
        const get = this.fser.getContent(element.ref).subscribe(data => {
          if (this.contents.find(cont => cont.$key == data.id) == undefined
            && (this.searchType == null || this.searchType == undefined || data.data()['type'] == this.searchType)) {

            this.contents.push({
              $key: data.id,
              title: data.data()['title'],
              type: data.data()['type'],
              nLikes: data.data()['nLikes'],
              nDislikes: data.data()['nDislikes'],
              nComments: data.data()['nComments'],
              imageUrl: data.data()['imageUrl'],
            })
          }
        });
        this.subscriptionsContent.push(get);
      });
    });
  }

  goLibraryItemPage(content: Content) {
    this.router.navigate([`/tabs/library-item/${content.$key}`]);
  }

  mapSearch() {
    this.router.navigate([`/tabs/library/mapa`]);
  }

  ruleSeach() {
    this.router.navigate([`/tabs/library/regra`]);
  }

  characterSearch() {
    this.router.navigate([`/tabs/library/ficha`]);
  }

  historySearch() {
    this.router.navigate([`/tabs/library/historia`]);
  }

}
