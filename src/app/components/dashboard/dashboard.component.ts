import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ComposeComponent } from '../compose/compose.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mails: any;
  to: any;
  cc: any;
  sub: any;
  mail: any;
  constructor(public dialog: MatDialog, private dataService: DataService) { }
 
  ngOnInit(): void {
    const allMails = JSON.parse(localStorage.getItem('mails')!);
    this.mails = allMails.filter((mail: any) => {
      return mail.to == this.dataService.userEmail || mail.cc == this.dataService.userEmail;
    });
  }

  onComposeMail(){
    const dialogRef = this.dialog.open(ComposeComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${JSON.stringify(result)}`);
    });
  }
}
