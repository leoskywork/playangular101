import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipboardComponent } from './components/clipboard/clipboard.component';

const routes: Routes = [
    //the root path
    { path: '', component: ClipboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
