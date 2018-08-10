import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public navLinks;

  constructor() {
    this.navLinks = [
      { path: '/user/profile', label: 'Profile' },
      { path: '/user/activity', label: 'Activity' }
    ];
  }

  ngOnInit() {
  }

}
