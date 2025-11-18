import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/service/account-service';
import { Home } from "../features/home/home";
import { User } from '../type/user';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private accountService=inject(AccountService);
  private http =inject(HttpClient);
  protected  title ='companty app';
  protected members=signal<User[]>([]);


   async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  };

  setCurrentUser(){
    const userString =localStorage.getItem('user');
    if (userString){
      const user=JSON.parse(userString);
      this.accountService.currentUser.set(user);
    }
  }


async getMembers(){
  try {
  return  lastValueFrom( this.http.get<User[]>('https://localhost:5251/api/members'));

}
  catch (error) {
   throw error;
  }
  
}}
