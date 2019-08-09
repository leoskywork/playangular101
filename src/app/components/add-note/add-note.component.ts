import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  showAddForm: boolean;
  isSaving: boolean;
  newNote: string;

  constructor() {}

  ngOnInit() {}

  enableSave() {
    return !!this.newNote && !this.isSaving;
  }

  enableCancel() {
    return !this.isSaving;
  }

  onBeginAddNote() {
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
  }
}
