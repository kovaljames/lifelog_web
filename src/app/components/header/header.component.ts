import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userFlow = false;
  @Input() drawer: any;

  constructor() { }

  ngOnInit(): void {
  }

  receiveBooleanValue($event: any) {
    this.userFlow= $event
  }

}
