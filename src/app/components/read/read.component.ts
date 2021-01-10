import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  mail:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.mail = data.mail;
  }

  ngOnInit(): void {
    console.log(this.mail);
  }
}
