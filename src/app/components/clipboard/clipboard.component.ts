import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {
  notes: Note[];
  isLoadingNotes: boolean;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.isLoadingNotes = true;
    this.noteService.getNotes(new Date()).subscribe(data => {
      this.isLoadingNotes = false;
      this.notes = data;
    }, error => {
      this.isLoadingNotes = false;
      this.onAjaxError(error, { source: 'init - get notes', params: 'todo...' });
    });
  }

  onAjaxError(error, request) {
    //todo - handle error, show to user? should do this in the service class(data access service)
    console.log(error);
  }
}
