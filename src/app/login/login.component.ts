import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  img: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitClicked = false;

  loginTiles: Tile[] = [
    {text: '', cols: 2, rows: 1, color: 'transparent', img: '../../assets/icons/ic_logo.png'},
    {text: 'Content dashboard sign-in', cols: 6, rows: 1, color: 'transparent', img: ''},
  ];

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private logger: NGXLogger
  ) {
  }

  ngOnInit(): void {
  }

  submitLoginCredentials() {
    this.submitClicked = true;
    this.attemptLogin(this.usernameFormControl.value, this.passwordFormControl.value);
  }

  attemptLogin(username: string, password: string) {
    this.authenticationService.attemptLogin(username, password)
    .pipe(first())
    .subscribe(
      data => {
        this.logger.info('Login successful', data);

        if (data.key) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          localStorage.setItem('token', data.key);
          this.submitClicked = false;
          this.successfulLogin();

        }
      }, error => {
        this.logger.error('Login failed', error);
        this.submitClicked = false;
        window.alert('Incorrect username or password');
        this.usernameFormControl.setValue('');
        this.passwordFormControl.setValue('');
      }
    );
  }


  successfulLogin() {
    this.router.navigate(['/content-dashboard']);
  }

  isValidated() {
    return !!(this.usernameFormControl.value != null && this.passwordFormControl.value != null
      && this.usernameFormControl.value !== '' && this.passwordFormControl.value !== ''
      && this.usernameFormControl.value.length > 3 && this.passwordFormControl.value.length > 3);
  }

}
