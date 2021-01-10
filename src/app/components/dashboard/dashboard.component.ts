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
  isMenuExpanded: boolean | undefined;
  unreadMsgs: number | undefined;
  constructor(public dialog: MatDialog, private dataService: DataService) { }
 
  ngOnInit(): void {
    const allMails = JSON.parse(localStorage.getItem('mails')!);
    this.mails = allMails.filter((mail: any) => {
      return mail.to == this.dataService.userEmail || mail.cc == this.dataService.userEmail;
    });
  }
  onMenuToggle() {
    this.isMenuExpanded = this.isMenuExpanded == true ? false : true;
  }
  searchEmail($event: any) {
    $event.target.blur();
  }

  onComposeMail(){
    const dialogRef = this.dialog.open(ComposeComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      const accounts = JSON.parse(localStorage.getItem('accounts')!);
      const account = accounts.find((acc: any) => {
        return acc.email == this.dataService.userEmail;
      });
      const name = account.name;
      const allMails = JSON.parse(localStorage.getItem('mails')!);
      allMails.push({
        senderName: name,
        from: this.dataService.userEmail,
        to: data.to,
        cc:  data.cc,
        sub:  data.sub,
        time: 'new time',
        mail: data.mail,
      });
      localStorage.removeItem('mails');
      localStorage.setItem('mails', JSON.stringify(allMails));
    });
  }
}
