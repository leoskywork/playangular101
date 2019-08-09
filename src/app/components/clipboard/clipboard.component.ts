import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { EventArgs, EventType } from '../../models/app-global';
import { ApiResult, LightResult } from '../../models/api-result';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {
  notes: Note[];
  isLoadingNotes: boolean;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.isLoadingNotes = true;
    this.getNotes(new Date(), 'init view of clipboard', _ => (this.isLoadingNotes = false));
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

        this.onAjaxError(error, {
          source: caller,
          params: date
        });
      }
    );
  }

  onManipulateNote(event: EventArgs<Note>) {
    console.log(event);
    if (!event) return;

    if (event.type === EventType.updatedNote) {
      this.getNotes(new Date(), event.type);
    } else if (event.type == EventType.deleteNote) {
      //?? hide note right away? - by remove it from this.notes
      if (!event.args) return;

      this.noteService.deleteNote(event.args).subscribe(
        result => {
          if (result.success) {
            //todo - show delete success message
            console.log(result.message);
            const noteIndex = this.notes.indexOf(event.args);
            if (noteIndex > -1) {
              this.notes.splice(noteIndex, 1);
            }
            //todo - reload data
          } else {
            this.onAjaxReturnFalsyResult(result);
          }
        },
        error => {
          this.onAjaxError(error, {
            source: event.type,
            params: event.args
          });
        }
      );
    }
  }

  onAjaxReturnFalsyResult<T>(result: ApiResult<T> | LightResult) {
    //todo - handle this in one place? in service class??
    //todo - maybe should handle this in service class, in an unified way
    console.log(result);
  }

  onAjaxError(error: any, request: { source: string; params: any }) {
    //todo - handle error, show to user? should do this in the service class(data access service)
    console.log('on ajax error, details ----->');
    console.log(error);
    console.log(request);
  }
}
