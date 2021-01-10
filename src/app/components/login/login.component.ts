import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Account } from '../../interfaces/account';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.error = null;
      const accounts: Account[] = JSON.parse(localStorage.getItem('accounts')!);
      const account: any = accounts.find((acc) => {
        return this.form.value.email == acc.email;
      });
      this.dataService.userEmail = account.email;
      if (account.password == this.form.value.password) {
        this.router.navigate(['mails']);
      } else {
        this.error = 'Username or password invalid';
      }
    } else {
      this.error = 'Username or password invalid';
    }
  }
}
