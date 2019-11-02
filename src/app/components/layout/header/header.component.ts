import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../common/constants'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title: string = Constants.getAppEnv() + ' ' + Constants.appName;
    version: string = Constants.version;
    versionDate: string = Constants.versionDate;
    currentNavItem: string = 'Note';

    constructor() { }

    ngOnInit() {
    }

    //not good to pass in $event, ref https://angular.io/guide/user-input#passing-event-is-a-dubious-practice
    //better way is to use template reference variable, get innerText from that variable, then pass in innerText directly
    // onClickNavItem(event: MouseEvent) {
    //     //console.log(event);
    //     const navItem = event.target as HTMLElement;
    //     this.currentNavItem = navItem.innerText;
    // }

    onClickNavItem2(item: string) {
        console.log(item);
        this.currentNavItem = item;
    }

}
