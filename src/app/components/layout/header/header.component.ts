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

    onClickNavItem(event: MouseEvent) {
        //console.log(event);
        const navItem = <HTMLElement>event.target;
        this.currentNavItem = navItem.innerText;
    }

}
