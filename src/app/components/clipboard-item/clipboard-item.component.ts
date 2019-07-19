import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-clipboard-item',
  templateUrl: './clipboard-item.component.html',
  styleUrls: ['./clipboard-item.component.css']
})
export class ClipboardItemComponent implements OnInit {
  @Input() note: Note;

  constructor() { }

  ngOnInit() {
  }

}
