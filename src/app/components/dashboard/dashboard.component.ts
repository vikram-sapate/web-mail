import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mails: any;
  constructor() { }

  ngOnInit(): void {
    this.mails = JSON.parse(localStorage.getItem('mails')!);
  }

}
