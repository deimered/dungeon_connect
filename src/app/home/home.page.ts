import { Component } from '@angular/core';
import {FireserviceService} from '../fireservice.service'
import { Task } from '../tasks'
import { IonItemSliding } from '@ionic/angular';
import { FireauthService } from '../fireauthservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: Array<any> = []; 

  constructor(public fser:FireserviceService,
              public router: Router,
              public authService: FireauthService,) {
    this.tasks = [
      {title: 'Milk', status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
      ];
  }

  ngOnInit() {
    this.fser.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          $key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          status: e.payload.doc.data()['status'],
        };
      });
      console.log(this.tasks);
    });
  } 

  addTask() {
    let ntask:string = prompt("New Task");
    if (ntask !== "") {
      let t:Task = {$key:'', title:ntask, status:'open'};
      console.log(t);
      this.fser.createTask(t).then(resp => {
        console.log("createTask: then - " +resp);
      }).catch(error => {
      console.log("createTask: catch - " +error);
      });
      console.log("addTask: " +this.tasks);
    } 
  }

  markAsDone(slidingItem: IonItemSliding, task:any) {
    task.status = (task.status === "done")? "open":"done";
    console.log ("markAsDone " + task);
    this.fser.updateTask (task.$key, task);
    slidingItem.close();
  }

  removeTask(slidingItem: IonItemSliding, task:any) {
    task.status = "removed";
    this.fser.deleteTask(task.$key);
    slidingItem.close();
  }

  logout(){
    this.authService.doLogout().then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  } 

}
