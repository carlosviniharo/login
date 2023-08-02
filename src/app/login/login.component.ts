import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  Login() {
    this.authService.login(this.email, this.password).subscribe(
      (resp) => {
        console.log(resp);
        console.log('You are logging');
        this.router.navigate(['profile']);
        localStorage.setItem('auth_token', resp.token);
      },
      (err) => {
        this.showLoginError();
      }
    );
  }

showLoginError() {

  this.snackBar.open('Invalid credentials. Please try again.', 'Dismiss', {
    duration: 5000000, // Set the duration for how long the pop-up should be visible (in milliseconds)
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar'],
     // Optional: Add a CSS class for styling the error pop-up
  });

}


}
