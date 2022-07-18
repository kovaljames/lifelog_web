import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public user: any = {
    name: "",
    picture: "https://avatars.githubusercontent.com/u/105296759?v=4"
  }

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.auth.user.subscribe(data => {
      if (data) {
        this.user.name = data.displayName || data.email
        if (data.photoURL)
          this.user.picture = data.photoURL
      }
    })
  }

  logout() {
    this.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
