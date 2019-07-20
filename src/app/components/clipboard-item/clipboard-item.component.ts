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

  constructor() { }

  ngOnInit() {
    this.newData = this.note.data;
  }

  onDelete() {

  }

  onBeginEdit() {
    console.log('onBeginEdit()');
    this.isEditing = true;
  }

  onCopy() {
    console.log('onCopy() - ' + this.note.data);
    // js only allow copy from input/textarea due to security restriction, so create a temp element node here
    //   - https://stackoverflow.com/questions/49236100/copy-text-from-span-to-clipboard
    const textArea = document.createElement('textarea');
    textArea.value = this.note.data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
    // todo - show 'Copied'
  }

  onSave() {
    this.isSaving = true;
    // todo - save to server

  }

  onCancelEdit() {
    this.isEditing = false;
    this.newData = this.note.data;
  }

  canEnableSave() {
    return this.isEditing && !this.isSaving && this.newData !== this.note.data;
  }

  canEnableCancel() {
    return !this.isSaving;
  }

}
