import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  

constructor(private http: HttpClient, private router: Router) { }


login(email: string, password: string): Observable<any> {
  return this.http.post(environment.apiUrl + 'users/login/', { email: email, password: password })
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('auth_token', resp.token);
      }),
      catchError((error) => {
         //this.showLoginError(); // Call the method to show the error pop-up
        return throwError(error);
      })
    );
}

/* showLoginError() {
  this.snackBar.open('Invalid credentials. Please try again.', 'Dismiss', {
    duration: 5000, // Set the duration for how long the pop-up should be visible (in milliseconds)
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar'] // Optional: Add a CSS class for styling the error pop-up
  });
} */


  logout() {
    localStorage.removeItem('auth_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }
}
