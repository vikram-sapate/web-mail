import { Component, OnInit } from '@angular/core';
import { accounts, mails } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WebMail';
  ngOnInit() {
    localStorage.setItem('mails', JSON.stringify(mails));
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
}
