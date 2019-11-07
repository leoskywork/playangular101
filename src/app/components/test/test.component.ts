import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    testCases: TestCases;
    testButtonDisabled: boolean;
    testMessage: string;

    loginButtonDisabled: boolean;
    loginMessage: string;
    email: string;
    password: string;

    loadDataButtonDisabled: boolean;
    loadDataMessage: string;

    constructor(private testService: TestService) { }

    ngOnInit() {
        this.testCases = new TestCases(this.testService);

        setTimeout(() => {
            this.email = 'leoskywork@outlook.com';
            this.password = 'test-pwd';
        }, 1000);
    }

    onTest() {
        if (this.testButtonDisabled) return;
        this.testButtonDisabled = true;
        this.testMessage = null;
        setTimeout(() => {
            this.testButtonDisabled = false;
        }, 1000);

        this.testCases.testLogout((d) => this.testMessage = this.convert(d));

        //test.testHttpGet(message => this.testMessage = message);
        //const registerData = { email: this.email, password: 'test-pwd', password2: 'test-pwd' };
        //this.testCases.testPostRegisterUser(registerData);

        //test.testPostLogin();
    }

    onTestLoadData() {
        if (this.loadDataButtonDisabled) return;
        this.loadDataButtonDisabled = true;
        this.loadDataMessage = null;
        setTimeout(() => {
            this.loadDataButtonDisabled = false;
        }, 1000);

        this.testCases.testGetData((data) => {
            if (typeof data == 'object') {
                this.loadDataMessage = JSON.stringify(data);
            } else {
                this.loadDataMessage = data;
            }
        });

    }

    onTestLogin() {
        if (this.loginButtonDisabled) return;
        this.loginButtonDisabled = true;
        this.loginMessage = null;
        setTimeout(() => {
            this.loginButtonDisabled = false;
        }, 1000);

        if (!this.email || !this.password) return;

        const user = { email: this.email, password: this.password };
        console.log(user);

        this.testCases.testPostLogin(user, (data) => {
            if (typeof data == 'object') {
                this.loginMessage = JSON.stringify(data);
            } else {
                this.loginMessage = data;
            }
        });
    }

    convert(data: any) {
        if (typeof data == 'object') {
            return JSON.stringify(data);
        }

        return data;
    }

}

class TestCases {

    constructor(private httpService: TestService) {
    }

    testLogout(callback: (data: any) => void) {
        this.httpService.getLogout().subscribe(data => callback(data));
    }

    testGetData(callback: (data: any) => void) {
        this.httpService.getFeed().subscribe(data => {
            callback(data);
        });
    }

    testPostLogin(user?: any, callback?: (data: any) => void) {
        if (!user) {
            user = {
                email: 'leoskywork@outlook.com',
                password: 'test-pwd'
            }
        }

        this.httpService.postLogin<any>(user).subscribe(respData => {
            console.log('login resp data: ', respData);

            if (callback) {
                callback(respData);
            }
        })
    }


    testPostRegisterUser(registerData: any) {
        if (!registerData) {
            registerData = {

                email: 'leoskywork@outlook.com',
                password: 'test-pwd',
                password2: 'test-pwd',
                // name: 'leo'
                name: null
            };
        }


        this.httpService.post(registerData).subscribe(resp => {
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