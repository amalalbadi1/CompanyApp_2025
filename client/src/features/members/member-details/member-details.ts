import { Component ,inject, signal} from '@angular/core';
import { MemberService } from '../../../core/service/member-service';
import { ActivatedRoute, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/service/account-service';
import { computed } from '@angular/core';
@Component({
  selector: 'app-member-details',
  imports: [ RouterLink,RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})
export class MemberDetails implements OnInit {

private route=inject(ActivatedRoute);
private accountService=inject(AccountService);
protected memberService=inject(MemberService);
private router=inject(Router);

protected title =signal<string|undefined>('profile');
protected isCurrentUser=computed(()=>{
  return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
})

ngOnInit(): void {

this.title.set(this.route.firstChild?.snapshot?.title);


this.router.events.pipe(
  filter(event=>event instanceof  NavigationEnd)
).subscribe({
  next:()=>{
  this.title.set(this.route.firstChild?.snapshot?.title);
}
})
}

}
