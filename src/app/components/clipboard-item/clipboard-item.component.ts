import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { EventArgs, EventType } from '../../models/app-global';

@Component({
    selector: 'app-clipboard-item',
    templateUrl: './clipboard-item.component.html',
    styleUrls: ['./clipboard-item.component.css']
})
export class ClipboardItemComponent implements OnInit, AfterViewInit {
    @Output() onManipulateNote: EventEmitter<EventArgs<Note>> = new EventEmitter();
    @Input() note: Note;
    isEditing: boolean;
    newData: string;
    isSaving: boolean;
    isConfirmDeleting: boolean;
    isDeleting: boolean;

    constructor(private noteService: NoteService) { }

    ngOnInit() {
        this.newData = this.note.data;
        //setTimeout(() => {
        //this.resizeReadonlyNoteItem();
        //});
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.resizeReadonlyNoteItem();
    }

    //auto resize textarea, ref https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    private resizeReadonlyNoteItem() {
        // console.log('enter resize...');
        const noteElement = document.querySelector('#ro-' + this.note.uid);
        if (noteElement) {
            const noteTextarea = noteElement as HTMLTextAreaElement;
            //console.log(`height: ${noteTextarea.style.height}, scroll height: ${noteTextarea.scrollHeight}, id: ${noteTextarea.id}`);
            // noteTextarea.style.height = 'auto'; //seems not needed
            noteTextarea.style.height = noteTextarea.scrollHeight + 'px';
            //console.log(`height: ${noteTextarea.style.height}, scroll height: ${noteTextarea.scrollHeight}, id: ${noteTextarea.id}`);
        }
    }

    hasNewAuthor() {
        return this.note.hasUpdated && this.note.lastUpdatedBy !== this.note.createdBy;
    }

    /* user events */

    onBeginDelete() {
        // if (confirm(`Are you sure to delete note(${this.note.data.substr(0, Math.min(5, this.note.data.length))}...)?`)) {
        //   console.log("confirm delete");
        // }

        this.isConfirmDeleting = true;
    }

    onConfirmedDelete() {
        // console.log('confirm delete');
        this.isConfirmDeleting = false;
        this.isDeleting = true;
        //this.manipulateNoteEvent.emit({ type: EventType.deleteNote, args: this.note });
        this.onManipulateNote.emit(new EventArgs(EventType.confirmedDeleteNote, this.note));
    }

    onCancelDelete() {
        this.isConfirmDeleting = false;
    }

    onMouseLeaveDelete(event: MouseEvent) {
        // console.log('delete - mouse leave');
        // setTimeout(() => {
        //   this.isConfirmDeleting = false;
        // }, 1000); //the timeout here need to sync with the value in CSS transition
    }

    onBeginEdit(event: MouseEvent) {
        // console.log('onBeginEdit()');
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

    onCancelEdit() {
        // console.log('onCancelEdit()');
        this.isEditing = false;
        this.newData = this.note.data;
    }

    onSave() {
        console.log('onSave()');
        this.isSaving = true;
        const newNote = Object.assign({}, this.note);
        newNote.data = this.newData;
        this.noteService.updateNote(newNote).subscribe(
            result => {
                this.isSaving = false;
                if (result.success) {
                    this.note.data = newNote.data;
                    this.isEditing = false;
                } else {
                    console.log('todo...' + result.message);
                }
                this.onManipulateNote.emit({ type: EventType.afterUpdateNote });
            },
            error => {
                this.isSaving = false;
                console.log('todo...' + error);
            }
        );
    }

    /* end of events */

    canEnableSave() {
        return this.isEditing && !this.isSaving && this.newData !== this.note.data;
    }

    canEnableCancel() {
        return !this.isSaving;
    }
}
