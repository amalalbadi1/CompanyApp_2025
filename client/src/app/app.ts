import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  private http =inject(HttpClient);
  protected  title ='companty app';
  protected members=signal<any[]>([]);


   async ngOnInit() {
    this.members.set(await this.getMembers());
  };

async getMembers(){
  try {
  return  lastValueFrom( this.http.get<any[]>('http://localhost:5251/api/members'));

}
  catch (error) {
   throw error;
  }
  
}}
