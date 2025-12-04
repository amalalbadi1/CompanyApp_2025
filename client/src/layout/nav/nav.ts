import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { inject } from '@angular/core';
import { AccountService } from '../../core/service/account-service';
import { RouterLink, RouterLinkActive ,Router} from "@angular/router";
import { ToastService } from '../../core/service/toast-service';
import { themes } from '../nav/theme';
import { BusyService } from '../../core/service/busy-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink,RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit{
  protected accountService=inject(AccountService);
protected busyService=inject(BusyService);
private router =inject(Router);
private toast =inject(  ToastService);
protected creds:any={};
protected selectedTheme=signal<string>(localStorage.getItem('theme')||'light');
protected themes= themes;


ngOnInit(): void {
document.documentElement.setAttribute('data-theme',this.selectedTheme());
}

handleSelectTheme(theme:string){
this.selectedTheme.set(theme);
localStorage.setItem('theme',theme);
document.documentElement.setAttribute('data-theme',theme);
const elem =document.activeElement as HTMLDivElement;
if(elem)elem.blur();}

login(){
this.accountService.login(this.creds).subscribe({
  next:()=>{
    this.router.navigateByUrl('/members');
  this.toast.success('logged in successfully');
    this.creds={};
  },
  error:error=>{
   this.toast.error(error.error);
  }
}); 
}
logout(){
  this.accountService.Logout();
  this.router.navigateByUrl('/');


}}
