import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  data: {
    to?: string;
    cc?: string;
    sub?: string;
    mail?: string;
  } = {};
  constructor() { }
  
  ngOnInit(): void {
  }



}
