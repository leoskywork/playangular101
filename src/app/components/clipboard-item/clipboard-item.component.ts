import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-clipboard-item',
  templateUrl: './clipboard-item.component.html',
  styleUrls: ['./clipboard-item.component.css']
})
export class ClipboardItemComponent implements OnInit {
  @Input() note: Note;
  isEditing: boolean;
  newData: string;
  isSaving: boolean;
  isConfirmDeleting: boolean;
  isDeleting: boolean;

  constructor() { }

  ngOnInit() {
    this.newData = this.note.data;
  }

  hasNewAuthor() {
    return this.note.hasUpdated && (this.note.lastUpdatedBy !== this.note.createdBy);
  }

  /* user events */

  onBeginDelete() {
    // if (confirm(`Are you sure to delete note(${this.note.data.substr(0, Math.min(5, this.note.data.length))}...)?`)) {
    //   console.log("confirm delete");
    // }
    this.isConfirmDeleting = true;
  }

  // onCancelDelete() {
  //   this.isConfirmDeleting = false;
  // }

  onConfirmedDelete() {
    this.isConfirmDeleting = false;
    this.isDeleting = true;
    console.log('confirm delete');

    setTimeout(() => {
      // this.isDeleting = false;
    }, 2000);


  }

  onMouseLeaveDelete(event: MouseEvent) {
    console.log('delete - mouse leave');
    // todo - do this by css, ease out
    setTimeout(() => {
      this.isConfirmDeleting = false;
    }, 1000); //the timeout here nee to sync with the value in CSS transition
  }

  onBeginEdit(event: MouseEvent) {
    console.log('onBeginEdit()');
    this.isEditing = true;
    console.log(event);
    setTimeout(() => {
      document.getElementById(`${this.note.uid}`).focus();
    }, 1);
  }

  onCopy() {
    console.log('onCopy() - ' + this.note.data);
    // js only allow copy from input/textarea due to security restriction, so create a temp element node here
    //   - https://stackoverflow.com/questions/49236100/copy-text-from-span-to-clipboard
    const textArea = document.createElement('textarea');
    textArea.value = this.note.data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    // todo - show msg 'Copied' in a tooltip
    //   - ref https://www.w3schools.com/css/css_tooltip.asp

  }

  onSave() {
    console.log('onSave()');
    this.isSaving = true;
    // todo - save to server

  }

  onCancelEdit() {
    console.log('onCancel()');
    this.isEditing = false;
    this.newData = this.note.data;
  }

  /* end of events */

  canEnableSave() {
    return this.isEditing && !this.isSaving && this.newData !== this.note.data;
  }

  canEnableCancel() {
    return !this.isSaving;
  }

}
