import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Constants } from '../common/constants'
import { Note } from '../models/note';
import { ApiResult } from '../models/api-result';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotes(date: Date): Observable<ApiResult<Note[]>> {
    // const headers = new HttpHeaders();
    // headers.append(Constants.LskSessionHeader, Constants.LskSessionDev); //not working
    const options = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        // 'lsk-session-id': Constants.LskSessionDev
      })
    }

    return this.http.get<ApiResult<Note[]>>(Constants.NotesUrlDev, options).pipe(
      catchError(this.handleError)
    );
  }

  handleError<T>(requestSource: string, requestArgs: T) {
    //todo -  https://angular.io/guide/http#adding-headers -> app/config/config.service.ts (handleError)
    console.log("handleError: " + requestSource);

    return throwError('todo...{user friendly message}');
  }
}
