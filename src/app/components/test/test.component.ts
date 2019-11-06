import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    testButtonDisabled: boolean;
    testMessage: string;

    constructor(private testService: TestService) { }

    ngOnInit() {
    }

    onTest() {
        if (this.testButtonDisabled) return;

        this.testButtonDisabled = true;
        setTimeout(() => {
            this.testButtonDisabled = false;
        }, 1000);

        const test = new TestCases(this.testService);

        //test.testHttpGet(message => this.testMessage = message);
        //test.testPostRegisterUser();

        test.testPostLogin();
    }

}

class TestCases {

    constructor(private httpService: TestService) {
    }

    testPostLogin() {
        const user = {
            email: 'leoskywork@outlook.com',
            password: 'test-pwd'
        }

        this.httpService.postLogin<any>(user).subscribe(respData => {
            console.log('login resp data: ', respData);
        })
    }


    testPostRegisterUser() {
        const obj = {

            email: 'leoskywork@outlook.com',
            password: 'test-pwd',
            password2: 'test-pwd',
            // name: 'leo'
            name: null
        };


        this.httpService.post(obj).subscribe(resp => {
            console.log('post resp: ', resp);
        });
    }

    testHttpGet(output: (msg: string) => void) {
        this.httpService.get().subscribe(result => {
            let message: string;
            if (typeof result == 'object') {
                message = JSON.stringify(result);
            } else {
                message = result;
            }
            output(message);
        });
    }
}