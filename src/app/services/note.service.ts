import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Constants } from '../common/constants';
import { Note } from '../models/note';
import { ApiResult, LightResult } from '../models/api-result';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private httpOption = {
    headers: NoteService.defaultHeaders()
  };

  constructor(private http: HttpClient) {}

  getNotes(date: Date): Observable<ApiResult<Note[]>> {
    // const headers = new HttpHeaders();
    // headers.append(Constants.LskSessionHeader, Constants.LskSessionDev);
    // headers.append('Content-Type', 'application/json'); //not working - because instance of HttpHeaders is immutable!!

    return this.http
      .get<ApiResult<Note[]>>(Constants.notesUrlDev, this.httpOption)
      .pipe(catchError(this.handleError));
  }

  updateNote(note: Note): Observable<ApiResult<Note>> {
    return this.http
      .put<ApiResult<Note>>(Constants.notesUrlDev, note, this.httpOption)
      .pipe(catchError(this.handleError));
  }

  deleteNote(note: Note): Observable<LightResult> {
    const url = `${Constants.notesUrlDev}/${note.uid}`;
    return this.http
      .delete<LightResult>(url, this.httpOption)
      .pipe(catchError(this.handleError));
  }

  addNote(note: Note): Observable<ApiResult<Note>> {
    return this.http
      .post<ApiResult<Note>>(Constants.notesUrlDev, note, this.httpOption)
      .pipe(catchError(this.handleError));
  }

  private handleError<T>(requestSource: string, requestArgs: T) {
    //todo -  https://angular.io/guide/http#adding-headers -> app/config/config.service.ts (handleError)
    console.log('todo...handleError: ' + requestSource);
    return throwError('todo...user friendly message');
  }

  // ----- static methods
  private static defaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'lsk-session-id': Constants.lskSessionDev
    });
  }
}
