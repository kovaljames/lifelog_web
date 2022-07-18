import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(
    private service: DataService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.idToken.subscribe(token => {
      if (token)
        this.service.getAllTasks(token).subscribe((data: any) => {
          if (data.success)
            this.tasks = data.data.tasks
        });
    });
  }

}
