import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Constants } from '../common/constants';
import { Note } from '../models/note';
import { ApiResult, LightResult } from '../models/api-result';
import { DtoMapper } from './dto-mapper';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private httpOption = {
        headers: NoteService.defaultHeaders()
    };

    constructor(private http: HttpClient) { }

    getNotes(date: Date): Observable<ApiResult<Note[]>> {
        // const headers = new HttpHeaders();
        // headers.append(Constants.LskSessionHeader, Constants.LskSessionDev);
        // headers.append('Content-Type', 'application/json'); //not working - because instance of HttpHeaders is immutable!!

        return this.http.get<ApiResult<object>>(Constants.getNoteApiUrl(), this.httpOption).pipe(
            catchError(this.handleError),
            map(apiResult => DtoMapper.mapResultDataArray(apiResult, DtoMapper.fromDtoNote))
        );
    }

    updateNote(note: Note): Observable<ApiResult<Note>> {
        const simpleNote = DtoMapper.toDtoNote(note);
        return this.http.put<ApiResult<Note>>(Constants.getNoteApiUrl(), simpleNote, this.httpOption).pipe(
            catchError(this.handleError),
            map(apiResult => DtoMapper.mapResultData(apiResult, DtoMapper.fromDtoNote))
        );
    }

    deleteNote(note: Note): Observable<LightResult> {
        // const url = `${Constants.getNoteApiUrl()}${note.uid}`;
        // const url = `${Constants.getBaseApiUrl()}restfulNote/${note.uid}`;
        const url = `${Constants.getBaseApiUrl()}v2/note/${note.uid}`;
        return this.http.delete<LightResult>(url, this.httpOption).pipe(catchError(this.handleError));
    }

    addNote(note: Note): Observable<ApiResult<Note>> {
        const dtoNote = DtoMapper.toDtoNote(note);
        return this.http.post<ApiResult<Note>>(Constants.getNoteApiUrl(), dtoNote, this.httpOption).pipe(catchError(this.handleError));
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
