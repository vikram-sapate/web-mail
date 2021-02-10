import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ComposeComponent } from '../compose/compose.component';
import { ReadComponent } from '../read/read.component';
import { SentComponent } from '../sent/sent.component';
import { Mail } from './mail.interface';
import { User } from './user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  mails: Mail[] = [];
  allMails: Mail[] = [];
  isMenuExpanded = true;
  unReadMails = 0;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.allMails = JSON.parse(localStorage.getItem('mails')!);
    this.mails = this.allMails.filter((mail: Mail) => {
      return (
        mail.to == this.dataService.userEmail ||
        mail.cc == this.dataService.userEmail
      );
    });
    this.unReadMails = this.mails.filter((m: Mail) => {
      return m.isRead == false;
    }).length;
  }

  onMenuToggle() {
    this.isMenuExpanded = this.isMenuExpanded == true ? false : true;
  }

  onLogOut() {
    this.router.navigate(['login']);
  }

  searchEmail($event: any) {
    $event.target.blur();
  }
  deleteMail(mail: Mail) {
    if (mail.isRead == false) {
      this.unReadMails--;
    }
    this.mails = this.mails.filter((m: Mail) => {
      return !(m.from == mail.from && mail.time == m.time);
    });
  }
  onSentMail() {
    this.allMails = JSON.parse(localStorage.getItem('mails')!);
    const sentMails = this.allMails.filter((m: Mail) => {
      return m.from == this.dataService.userEmail;
    });
    const dialogRef = this.dialog.open(SentComponent, {
      width: '700px',
      data: {
        sentMails: sentMails,
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {});
  }
  onComposeMail() {
    const dialogRef = this.dialog.open(ComposeComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (!data) return;
      if (!data.to) return;
      const accounts = JSON.parse(localStorage.getItem('accounts')!);
      const account = accounts.find((acc: User) => {
        return acc.email == this.dataService.userEmail;
      });
      const name = account.name;
      const allMails = JSON.parse(localStorage.getItem('mails')!);
      allMails.push({
        senderName: name,
        from: this.dataService.userEmail,
        to: data.to,
        cc: data.cc,
        sub: data.sub,
        time: new Date(),
        mail: data.mail,
        isRead: false,
      });
      localStorage.removeItem('mails');
      localStorage.setItem('mails', JSON.stringify(allMails));
    });
  }

  openMail(openedMail: Mail) {
    const mail: any = this.mails.find((m: Mail) => {
      return m.from == openedMail.from && openedMail.time == m.time;
    });
    if (!mail.isRead) {
      mail.isRead = true;
      this.unReadMails--;
    }

    const dialogRef = this.dialog.open(ReadComponent, {
      width: '700px',
      data: {
        mail: mail,
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {});
  }
}
