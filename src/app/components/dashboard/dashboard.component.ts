import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComposeComponent } from '../compose/compose.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mails: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mails = JSON.parse(localStorage.getItem('mails')!);
  }

  onComposeMail(){
    const dialogRef = this.dialog.open(ComposeComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
