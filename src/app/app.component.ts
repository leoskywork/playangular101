import { Component } from '@angular/core';
import { Constants } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = Constants.getAppEnv() + ' ' + Constants.appName;
  version: string = Constants.version;
  versionDate: string = Constants.versionDate;
  createdAt: Date = new Date('2019-7-15');

  constructor() {
    this.test();
  }

  test() {
    console.log('app.component - test');
  }
}
