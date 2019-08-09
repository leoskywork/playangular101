import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventArgs, EventType } from 'src/app/models/app-global';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  @Output() onAddNote: EventEmitter<EventArgs<string>> = new EventEmitter();
  showAddForm: boolean;
  isSaving: boolean;
  newNote: string;

  constructor() {}

  ngOnInit() {}

  enableSave() {
    return !this.isSaving && !!this.newNote && this.newNote.length < 1023;
  }

  enableCancel() {
    return !this.isSaving;
  }

  onAddNoteBegin() {
    this.showAddForm = true;
    setTimeout(() => {
      const textarea = document.querySelector('#add-note-container form textarea');
      (<HTMLTextAreaElement>textarea).focus();
      //console.log(textarea);
    }, 1);
  }

  onSave() {
    console.log('new note: ' + this.newNote);
    this.isSaving = true;
    this.onAddNote.emit(new EventArgs(EventType.submitNewNote, this.newNote));
  }

  onAddNoteEnd(success: boolean) {
    setTimeout(() => {
      this.isSaving = false;
    }, 400);
    if (success) {
      this.newNote = null;
      setTimeout(() => {
        const textarea = document.querySelector('#add-note-container form textarea');
        (<HTMLTextAreaElement>textarea).focus();
      }, 500);
    }
  }
}
