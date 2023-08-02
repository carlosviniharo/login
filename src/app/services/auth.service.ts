import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://127.0.0.1:8000/users';
  token: any;

constructor(private http: HttpClient, private router: Router) { }
  login(email: string, password: string){
    this.http.post(this.uri +'/login', {email: email, password: password })
    .subscribe((resp: any) => {

      this.router.navigate(['profile']);
      localStorage.setItem('auth_token', resp.token);
    })
  }
  logout() {
    localStorage.removeItem('token');
  }
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
