import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
private lcoation= inject(Location);
goBack(){
  this.lcoation.back();
}
}