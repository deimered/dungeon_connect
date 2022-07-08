import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService } from '../fireservice.service'
import { Content } from '../classes/content';
import { Router } from '@angular/router';


@Component({
  selector: 'app-public-perfil',
  templateUrl: './public-perfil.page.html',
  styleUrls: ['./public-perfil.page.scss'],
})
export class PublicPerfilPage implements OnInit {

  user: any = { $key: '', name: '', imageUrl: '' };
  contentsRef: Array<string>;
  contents: Array<Content>;
  hasSubscribed: boolean;

  constructor(private route: ActivatedRoute,
              public fser: FireserviceService,
              private router: Router) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('id');

    this.fser.getUser(key).subscribe(data => {
      if (data.exists) {
        this.user = {
          $key: data.id,
          name: data.data()['name'],
          imageUrl: data.data()['imageUrl'],
        }

        this.fser.getSubscription(this.user.$key).subscribe(data => { this.hasSubscribed = data.exists });

        this.fser.getContentUser(this.user.$key).subscribe(data => {
          this.contentsRef = data.map(e => {
            return e.payload.doc.id;
          });

          this.contents = [];

          this.contentsRef.forEach(ref => {
            this.fser.getContent(ref).subscribe(data => {
              this.contents.push(
                {
                  $key: data.id,
                  title: data.data()['title'],
                  type: data.data()['type'],
                  nLikes: data.data()['nLikes'],
                  nDislikes: data.data()['nDislikes'],
                  nComments: data.data()['nComments'],
                  imageUrl: data.data()['imageUrl'],
                }
              );
            })
          });
        });
      }
    });
  }

  ionViewWillEnter() {
    if (this.user.$key != '') {
      this.fser.getSubscription(this.user.$key).subscribe(data => { this.hasSubscribed = data.exists });
    }
  }

  followUser() {
    if (this.user.$key != '') {
      if (!this.hasSubscribed) {
        this.fser.addSubscription(this.user.$key).then(
          res => { this.hasSubscribed = true; }
        );
      }

      else
        this.fser.removeSubscriptions(this.user.$key).then(
          res => { this.hasSubscribed = false; }
        );
    }
  }

  goPublicationPage(content){
    this.router.navigate([`/tabs/publication/${content.$key}`]);
   }
}
