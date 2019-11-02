import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { ClipboardItemComponent } from './components/clipboard-item/clipboard-item.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HeaderComponent } from './components/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ClipboardComponent,
    ClipboardItemComponent,
    AddNoteComponent,
    AboutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
