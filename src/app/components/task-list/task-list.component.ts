import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Task } from 'src/app/models/task.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: any = null;

  constructor(
    private service: DataService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  markAsDone(task: Task) {
    this.auth.idToken.subscribe(token => {
      if (token) {
        const data = { id: task.id, user: "", dateEnd: new Date().toJSON() }
        this.service.markAsDone(data, token)
          .subscribe(res => {
            task.done = true
          });
      }
    })
  }

  markAsUndone(task: Task) {
    this.auth.idToken.subscribe(token => {
      if (token) {
        const data = { id: task.id, user: "", dateEnd: new Date().toJSON() }
        this.service.markAsUndone(data, token)
          .subscribe(res => {
            task.done = false
          });
      }
    })
  }

}
