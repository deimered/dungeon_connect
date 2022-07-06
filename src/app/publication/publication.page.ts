import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Content} from '../classes/content';
import {ContentCharacter} from '../classes/contentCharacter';
import {ContentHistory} from '../classes/contentHistory';
import {ContentMap} from '../classes/contentMap';
import {ContentRule} from '../classes/contentRule';
import {Comment} from '../classes/comment';
import {FireserviceService} from '../fireservice.service'


@Component({
  selector: 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {

  content: Content;
  comments: Array<Comment>;
  contentDetails: any;
  publisher: any = {name:'', imageUrl:''};
  hasSubscribed: boolean;
  hasSavedInLibrary: boolean;

  constructor(private route: ActivatedRoute,
              public fser:FireserviceService) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('id');
    
    this.fser.getContent(key).subscribe(data => {
      this.content = {
        $key: data.id,
        title: data.data()['title'],
        type: data.data()['type'],
        nLikes: data.data()['nLikes'],
        nDislikes: data.data()['nDislikes'],
        nComments: data.data()['nComments'],
        imageUrl: data.data()['imageUrl'],
      };

      this.fser.getLibraryItem(this.content.$key).subscribe(data => {this.hasSavedInLibrary = data.exists});

      this.fser.getContentInformation(this.content).then(res => {
        if (!res.empty){

          switch(this.content.type){
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
        
        this.fser.getSubscription(this.contentDetails.user).subscribe(data => {this.hasSubscribed = data.exists});
        this.fser.getUser(this.contentDetails.user).subscribe(data => 
          {this.publisher = {
            $key: data.id,
            name: data.data()['name'],
            imageUrl: data.data()['imageUrl'],
          }
          });

      }).catch(error => {
        console.log("getContentInformation: catch - " +error);
      });

      this.fser.getComments(this.content).subscribe(data => {
        this.comments = data.map(e => {
          return {
            $key: e.payload.doc.id,
            ref: e.payload.doc.data()['ref'],
            type: e.payload.doc.data()['type'],
            user: e.payload.doc.data()['user'],
            comment: e.payload.doc.data()['comment'],
          };
        });
        console.log(this.comments);
      });
    });
  }

  ionViewWillEnter(){
    if (this.contentDetails != undefined && this.content != undefined){
      this.fser.getSubscription(this.contentDetails.user).subscribe(data => {this.hasSubscribed = data.exists});
      this.fser.getLibraryItem(this.content.$key).subscribe(data => {this.hasSavedInLibrary = data.exists});
    }
  }

  saveContent(){
    if (!this.hasSavedInLibrary){
      this.fser.addLibrary(this.content.$key).then(
        res => {this.hasSavedInLibrary = true;}
      );
    }
      
    else
      this.fser.removeLibrary(this.content.$key).then(
        res => {this.hasSavedInLibrary = false;}
      );
  }

  followUser(){
    if (!this.hasSubscribed){
      this.fser.addSubscription(this.contentDetails.user).then(
        res => {this.hasSubscribed = true;}
      );
    }
      
    else
      this.fser.removeSubscriptions(this.contentDetails.user).then(
        res => {this.hasSubscribed = false;}
      );
  }

}
