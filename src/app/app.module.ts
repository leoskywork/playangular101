import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { ClipboardItemComponent } from './components/clipboard-item/clipboard-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ClipboardComponent,
    ClipboardItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
