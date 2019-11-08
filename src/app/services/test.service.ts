import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(private http: HttpClient) { }

    get(): Observable<string> {
        let options = {};
        //need add this if api returns plain text, the default parser is json, which will throw error when parse plain text
        //options.responseType = 'text';

        return this.http.get<string>('http://localhost:5000/users/register', options).pipe(
            map(result => {
                console.log('test.get resp: ', result);
                return result;
            }),
            catchError(this.handleError)
        );
    }

    post<T>(data: T): Observable<string> {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<string>('http://localhost:5000/users/register', data, options).pipe(catchError(this.handleError));
    }

    //todo: error handling
    handleError(error: any) {
        console.log('testService error: ', error);
        return throwError(error);
    }

    postLogin<T>(data: T): Observable<any> {
        let options = {
            withCredentials: true,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<any>('http://localhost:5000/users/login', data, options).pipe(catchError(this.handleError));
    }

    getFeed(): Observable<any> {
        return this.http.get<any>('http://localhost:5000/feedGuarded', { withCredentials: true }).pipe(catchError(this.handleError));

        //400 bad request (missing credentials)
        // return this.http.get<any>('http://localhost:5000/secured').pipe(catchError(this.handleError));
        //works
        // return this.http.get<any>('http://localhost:5000/secured?email=leo@leo.com&password=test-pwd').pipe(catchError(this.handleError));

        //works
        // return this.http.post<any>('http://localhost:5000/secured?email=leo@leo.com&password=test-pwd', { test: 'test' }).pipe(catchError(this.handleError));
        //400 bad request (missing credentials)
        // return this.http.post<any>('http://localhost:5000/secured', { test: 'test' }).pipe(catchError(this.handleError));
        //works
        // return this.http.post<any>('http://localhost:5000/secured', { email: 'leo@leo.com', password: 'test-pwd' }).pipe(catchError(this.handleError));
    }

    getLogout(): Observable<any> {
        return this.http.get<any>('http://localhost:5000/users/logout', { withCredentials: true }).pipe(catchError(this.handleError));
    }

}
