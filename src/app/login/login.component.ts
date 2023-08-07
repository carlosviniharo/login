import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../services/users.service';

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
    private snackbarService: SnackbarService,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit() {}

  async Login() {
    try {
      const resp = await this.authService.login(this.email, this.password).toPromise();
      console.log(resp);
      console.log('You are logging');
      
      const user = await this.get_usuario(this.email);
      
      const navigationExtras: NavigationExtras = {
        state: { user: user }
      };
      console.log(navigationExtras);
      
      this.router.navigate(['profile'], navigationExtras);
      localStorage.setItem('auth_token', resp.token);
    } catch (err) {
      this.snackbarService.show('Invalid credentials. Please try again.');
    }
  }
  
  async get_usuario(email:string) {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(
        this.userService.get_usuario(email)
      );
      console.log('Data received:', resp);
      return resp;
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
      return error;
    }
  }
}
