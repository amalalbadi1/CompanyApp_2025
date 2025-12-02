import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MemberService } from '../../core/service/member-service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Member } from '../../type/member';


export const memberResolver: ResolveFn<Member> = (route, state) => {
 const memberService =inject(MemberService);
 const router=inject(Router);
 const memberId=route.paramMap.get('id');
 
  if(!memberId){
    router.navigateByUrl('/not-found');
    return EMPTY;
  }
  return memberService.getMember(memberId);
};
