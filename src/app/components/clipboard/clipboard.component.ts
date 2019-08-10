import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { EventArgs, EventType } from '../../models/app-global';
import { ApiResult, LightResult } from '../../models/api-result';
import { AddNoteComponent } from '../add-note/add-note.component';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {
  @ViewChild(AddNoteComponent, { static: false })
  private addNote: AddNoteComponent;
  notes: Note[];
  isLoadingNotes: boolean;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.isLoadingNotes = true;
    this.getNotes(new Date(), 'init view of clipboard', _ => setTimeout(() => (this.isLoadingNotes = false), Constants.minVisualTimeMS));
  }

  getNotes(date: Date, caller: string, onAjaxReturned?: (success: boolean) => void) {
    this.noteService.getNotes(date).subscribe(
      result => {
        if (onAjaxReturned) onAjaxReturned(result.success);

        if (result.success) {
          // angular no longer provide pipes for filtering or sorting
          // sort by createdAt desc, typeof a.createdAt is string !!! when running in js code, have to manual convert here
          this.notes = result.data.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
        } else {
          this.onAjaxReturnFalsyResult(result);
        }
      },
      error => {
        if (onAjaxReturned) onAjaxReturned(false);
        this.onAjaxError(error, caller, date);
      }
    );
  }

  onManipulateNote(event: EventArgs<Note>) {
    console.log(event);
    if (!event) return;

    if (event.type === EventType.afterUpdateNote) {
      this.getNotes(new Date(), event.type);
    } else if (event.type == EventType.confirmedDeleteNote) {
      //?? hide note right away? - by remove it from this.notes
      if (!event.args) return;

      this.noteService.deleteNote(event.args).subscribe(
        result => {
          if (result.success) {
            //todo - show delete success message
            console.log(result.message);
            const noteIndex = this.notes.indexOf(event.args);
            if (noteIndex > -1) {
              setTimeout(() => {
                this.notes.splice(noteIndex, 1);
              }, Constants.minVisualTimeMS);
            }
            //todo - reload data
          } else {
            this.onAjaxReturnFalsyResult(result);
          }
        },
        error => this.onAjaxError(error, event.type, event.args)
      );
    }
  }

  onAddNote(event: EventArgs<string>) {
    if (!event || !event.args) return;

    this.noteService.addNote(new Note(event.args)).subscribe(
      result => {
        if (result.success) {
          this.getNotes(new Date(), 'auto refresh after add note');
        } else {
          this.onAjaxReturnFalsyResult(result);
        }
        this.addNote.onAddNoteEnd(result.success);
      },
      error => this.onAjaxError(error, event.type, event.args)
    );
  }

  onAjaxReturnFalsyResult<T>(result: ApiResult<T> | LightResult) {
    //todo - handle this in one place? in service class??
    //todo - maybe should handle this in service class, in an unified way
    console.log(result);
  }

  onAjaxError(error: any, requestSource: string, requestParams?: any) {
    //todo - handle error, show to user? should do this in the service class(data access service)
    console.log('on ajax error, details ----->');
    console.log(error);
    console.log(requestSource);
    if (requestParams) console.log(requestParams);
  }
}
