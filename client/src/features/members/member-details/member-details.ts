import { Component ,inject, signal} from '@angular/core';
import { MemberService } from '../../../core/service/member-service';
import { ActivatedRoute, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../type/member';
import { AsyncPipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-details',
  imports: [ RouterLink,RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})
export class MemberDetails implements OnInit {

private route=inject(ActivatedRoute);
private router=inject(Router);
protected member=signal<Member |undefined>(undefined);
protected title =signal<string|undefined>('profile');

ngOnInit(): void {
  this.route.data.subscribe({
    next:(data)=>{
      this.member.set(data['member']);
    }
  });
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
