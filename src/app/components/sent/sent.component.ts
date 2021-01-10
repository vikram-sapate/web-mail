import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  sentMails: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.sentMails = data.sentMails;
  }

  ngOnInit(): void {
    console.log(this.sentMails);
  }

}
