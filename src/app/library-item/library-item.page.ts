import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Content } from '../classes/content';
import { ContentCharacter } from '../classes/contentCharacter';
import { ContentHistory } from '../classes/contentHistory';
import { ContentMap } from '../classes/contentMap';
import { ContentRule } from '../classes/contentRule';
import { FireserviceService } from '../fireservice.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.page.html',
  styleUrls: ['./library-item.page.scss'],
})
export class LibraryItemPage implements OnInit {

  content: Content;
  contentDetails: any;
  publisher: any = { $key: '', name: '', imageUrl: '' };
  subscriptionContent: Subscription;
  subscriptionUser: Subscription;

  constructor(private location: Location,
    public fser: FireserviceService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('id');

    this.subscriptionContent = this.fser.getContent(key).subscribe(data => {
      this.content = {
        $key: data.id,
        title: data.data()['title'],
        type: data.data()['type'],
        nLikes: data.data()['nLikes'],
        nDislikes: data.data()['nDislikes'],
        nComments: data.data()['nComments'],
        imageUrl: data.data()['imageUrl'],
      };


      this.fser.getContentInformation(this.content).then(res => {
        if (!res.empty) {

          switch (this.content.type) {
            case 'historia':
              this.contentDetails = {
                $key: res.docs[0].id,
                user: res.docs[0].data()['user'],
                ref: res.docs[0].data()['ref'],
                history: res.docs[0].data()['history'],
              } as ContentHistory;
              break;
            case 'regra':
              this.contentDetails = {
                $key: res.docs[0].id,
                user: res.docs[0].data()['user'],
                ref: res.docs[0].data()['ref'],
                rule: res.docs[0].data()['rule'],
              } as ContentRule;
              break;
            case 'mapa':
              this.contentDetails = {
                $key: res.docs[0].id,
                user: res.docs[0].data()['user'],
                ref: res.docs[0].data()['ref'],
              } as ContentMap;
              break;
            case 'ficha':
              this.contentDetails = {
                $key: res.docs[0].id,
                user: res.docs[0].data()['user'],
                ref: res.docs[0].data()['ref'],
                name: res.docs[0].data()['name'],
                job: res.docs[0].data()['job'],
                race: res.docs[0].data()['race'],
                str: res.docs[0].data()['str'],
                dex: res.docs[0].data()['dex'],
                cos: res.docs[0].data()['cos'],
                int: res.docs[0].data()['int'],
                wis: res.docs[0].data()['wis'],
                car: res.docs[0].data()['car'],
                ht: res.docs[0].data()['ht'],
                mov: res.docs[0].data()['mov'],
              } as ContentCharacter;
              break;
          }
        }
        this.subscriptionUser = this.fser.getUser(this.contentDetails.user).subscribe(data => {
          this.publisher = {
            $key: data.id,
            name: data.data()['name'],
            imageUrl: data.data()['imageUrl'],
          }
        });
        //this.fser.saveSubscriptions(subUser);
      }).catch(error => {
        console.log("getContentInformation:  - " + error);
      });
    });
    //this.fser.saveSubscriptions(sub);
  }

  ngOnDestroy(){
    this.subscriptionContent.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }

  remove() {
    this.fser.removeLibrary(this.content.$key).then(
      res => { this.goBack(); }
    );
  }

  goBack() {
    this.location.back();
  }

  subscriptionPerfil() {
    this.router.navigate([`/tabs/public-perfil/${this.publisher.$key}`]);
  }

}
