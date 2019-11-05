import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isTestDisabled: boolean;
    testMessage: string;

    constructor(private testService: TestService) { }

    ngOnInit() {
    }

    onTest() {
        if (this.isTestDisabled) return;

        this.isTestDisabled = true;
        setTimeout(() => {
            this.isTestDisabled = false;
        }, 1000);


        // this.testHttpGet();
        this.testHttpPost();

    }

    testHttpPost() {
        const obj = {
            name: 'leo'
        };

        this.testService.post(obj).subscribe(resp => {
            console.log('post resp: ', resp);
        });
    }

    testHttpGet() {
        this.testService.get().subscribe(result => {
            if (typeof result == 'object') {
                this.testMessage = JSON.stringify(result);
            } else {
                this.testMessage = result;
            }
        });
    }
}
