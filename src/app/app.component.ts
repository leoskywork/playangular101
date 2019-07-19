import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular 101';
  createdAt: Date = new Date('2019-7-15');

  constructor() {

  }

  test() {
    console.log("test");
    let a = 10;
  }
}
