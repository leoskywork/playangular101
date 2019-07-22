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
    // headers.append(Constants.LskSessionHeader, Constants.LskSessionDev); //not working - because instance of HttpHeaders is immutable!!
    // headers.append('Content-Type', 'application/json');

    return this.http.get<ApiResult<Note[]>>(Constants.NotesUrlDev, { headers: this.defaultHeaders() }).pipe(catchError(this.handleError));
  }

  updateNote(note: Note): Observable<ApiResult<Note>> {
    return this.http.put<ApiResult<Note>>(Constants.NotesUrlDev, note, { headers: this.defaultHeaders() }).pipe(catchError(this.handleError));
  }

  deleteNote(note: Note): Observable<ApiResult<string>> {
    const url = `${Constants.NotesUrlDev}/${note.uid}`
    return this.http.delete<ApiResult<string>>(url, { headers: this.defaultHeaders() }).pipe(catchError(this.handleError));
  }

  addNote(note: Note): Observable<ApiResult<Note>> {
    return this.http.post<ApiResult<Note>>(Constants.NotesUrlDev, note, { headers: this.defaultHeaders() }).pipe(catchError(this.handleError));
  }


  private defaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'lsk-session-id': Constants.LskSessionDev
    });
  }

  private handleError<T>(requestSource: string, requestArgs: T) {
    //todo -  https://angular.io/guide/http#adding-headers -> app/config/config.service.ts (handleError)
    console.log("todo...handleError: " + requestSource);

    return throwError('todo...user friendly message');
  }
}
