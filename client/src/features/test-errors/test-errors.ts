import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { single } from 'rxjs';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5251/api/';
  //validationErrors= single<string[]>([]);
 validationErrors = signal<string[]>([]);



  private handleError(error: any) {
    console.log('Status:', error.status);
    console.log('Error message:', error?.error || error.message || error);
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: res => console.log(res),
      error: err => this.handleError(err)
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: res => console.log(res),
      error: err => this.handleError(err)
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: res => console.log(res),
      error: err => this.handleError(err)
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/unauthorized').subscribe({
      next: res => console.log(res),
      error: err => this.handleError(err)
    });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', { }).subscribe({
      next: res => console.log(res),
      error: err => {console.log(err);
      this.validationErrors .set(err); }
      
    });
  }
}
