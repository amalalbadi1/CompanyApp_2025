import { HttpClient } from '@angular/common/http';
import {inject, Injectable,signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../type/user';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  
  private http=inject(HttpClient);
  currentUser=signal<User| null>(null);

  baseUrl = 'https://localhost:5251/api';

  register(creds:RegisterCreds){
    return this.http.post<User>(this.baseUrl + '/account/register', creds).pipe(
    tap(user => {
      if (user){
        this.setCurrentUser(user);
      }
     
    })
  )
  }


login(creds:LoginCreds){
  return this.http.post<User>(this.baseUrl + '/account/login', creds).pipe(
    tap(user => {
      if (user){
        this.setCurrentUser(user);
      }
     
    })
  )
}

setCurrentUser(user:User){
   localStorage.setItem('user', JSON.stringify(user));
         this.currentUser.set(user);}

Logout(){
  localStorage.removeItem('user');
  this.currentUser.set(null);
}
}  
