import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  create_user(user: any) {
    return this.http.post(environment.apiUrl + 'users/user_register/', user).pipe(
      map((resp: any) => resp)
    );
  }

  get_generos():Observable<any> {
    return this.http.get(environment.apiUrl + 'users/generos/').pipe(
      map((resp: any) => resp)
    );
  }
  get_idtipopersonas():Observable<any> {
    return this.http.get(environment.apiUrl + 'users/tipopersonas').pipe(
      map((resp: any) => resp)
    );
  }
}
