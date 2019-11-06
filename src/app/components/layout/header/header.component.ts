import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../../common/constants'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    title: string = Constants.getAppEnv() + ' ' + Constants.appName;
    version: string = Constants.version;
    versionDate: string = Constants.versionDate;
    currentNavItem: string = '/';

    constructor(private router: Router) { }

    ngOnInit() {
        setTimeout(() => {
            let routerUrl = this.router.url;
            if (routerUrl == Constants.routeRootSlash) {
                routerUrl = '/' + Constants.routeClipboard;
            }
            this.currentNavItem = this.router['location']['_baseHref'] + routerUrl;
        });
    }

    //auto select nav item by url - not working and throw error, do it by setTimeout() in ngOnInit()
    ngAfterViewInit() {
    }

    //not good to pass in $event, ref https://angular.io/guide/user-input#passing-event-is-a-dubious-practice
    //better way is to use template reference variable, get innerText from that variable, then pass in innerText directly
    // onClickNavItem(event: MouseEvent) {
    //     //console.log(event);
    //     const navItem = event.target as HTMLElement;
    //     this.currentNavItem = navItem.innerText;
    // }

    onClickNavItem2(itemPath: string) {
        console.log(itemPath);
        this.currentNavItem = itemPath;
    }

}
