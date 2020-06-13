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
    testButtonTitle: string = 'Test';

    loginButtonDisabled: boolean;
    loginMessage: string;
    logoutButtonDisabled: boolean;
    logoutMessage: string;
    email: string;
    password: string;

    loadDataButtonDisabled: boolean;
    loadDataMessage: string;

    constructor(private testService: TestService) {

    }

    ngOnInit() {
        this.testCases = new TestCases(this.testService);

        setTimeout(() => {
            this.email = 'leoskywork@outlook.com';
            this.password = 'test-pwd';

            //reset title
            //this.testButtonTitle = 'Logout';
        }, 500);
    }

    onTest() {
        if (this.testButtonDisabled) return;
        this.testButtonDisabled = true;
        this.testMessage = null;
        setTimeout(() => {
            this.testButtonDisabled = false;
        }, 1000);

        let queryArgs = { limit: 10, start: 100, date: '2019-01-01' }
        queryArgs = null;
        this.testCases.testGetNews(queryArgs, (data) => this.testMessage = this.convert(data));

        //this.testCases.testHttpGet(message => this.testMessage = message);

        //this.testCases.testPostRegisterUser({ email: this.email, password: 'test-pwd', password2: 'test-pwd' });

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

    onTestLogout() {
        if (this.logoutButtonDisabled) return;
        this.logoutButtonDisabled = true;
        this.logoutMessage = null;
        setTimeout(() => {
            this.logoutButtonDisabled = false;
        }, 1000);



        this.testCases.testLogout((d) => this.logoutMessage = this.convert(d));
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

    testGetNews(queryArgs?: object, callback?: (data: any) => void) {
        this.httpService.getNews(queryArgs).subscribe(data => {
            if (callback) {
                callback(data);
            }
        });
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