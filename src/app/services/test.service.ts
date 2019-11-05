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
                console.log(result);
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

    handleError(error: any) {
        console.log('test error: ', error);
        return throwError(error);
    }
}
