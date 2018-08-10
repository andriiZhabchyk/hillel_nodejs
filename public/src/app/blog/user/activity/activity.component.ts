import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  dataSource = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor() { }

  ngOnInit() {
  }

}
