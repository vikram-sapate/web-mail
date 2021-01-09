import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.error = null;
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      if (
        email == this.form.value.email &&
        password == this.form.value.password
      ) {
        this.router.navigate(['mails']);
      } else {
        this.error = 'Username or password invalid';
      }
    } else {
      this.error = 'Username or password invalid';
    }
  }
}
