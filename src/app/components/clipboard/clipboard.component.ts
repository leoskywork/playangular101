import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {
  notes: Note[];

  constructor() { }

  ngOnInit() {
    this.notes = [
      {
        "uid": "90a8bb11-6b1e-4260-a228-82069ee5dcb3",
        "userId": "u086001",
        "createdAt": new Date("2019-07-18T11:28:52.6489109+08:00"),
        "data": "test678910 11"
      },
      {
        "uid": "aef2b48d-db52-4f07-acdc-af490d035a9e",
        "userId": "u086001",
        "createdAt": new Date("2019-07-19T15:28:32.3871758+08:00"),
        "data": "test678910 11 12"
      },
      {
        "uid": "26aaa648-d533-484c-84f7-f6f81214fa24",
        "userId": "u086002",
        "createdAt": new Date("2019-07-19T15:28:38.9301478+08:00"),
        "data": "test678910 11 12 222"
      }
    ];
  }

}
