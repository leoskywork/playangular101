import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { EventArgs, EventType } from '../../models/app-global';
import { ApiResult } from 'src/app/models/api-result';

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
    this.noteService.getNotes(new Date()).subscribe(
      result => {
        this.isLoadingNotes = false;
        if (result.success) {
          this.notes = result.data;
        } else {
          this.onAjaxReturnFalsyResult(result);
        }
      },
      error => {
        this.isLoadingNotes = false;
        this.onAjaxError(error, {
          source: 'init - get notes',
          params: 'todo...'
        });
      }
    );
  }

  onManipulateNote(event: EventArgs<Note>) {
    console.log(event);
  }

  onAjaxReturnFalsyResult<T>(result: ApiResult<T>) {
    //todo - handle this in one place? in service class??
    //todo - maybe should handle this in service class, in an unified way
    console.log(result);
  }

  onAjaxError(error: any, request: { source: string; params: string }) {
    //todo - handle error, show to user? should do this in the service class(data access service)
    console.log(error);
  }
}
