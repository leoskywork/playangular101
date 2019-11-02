import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { AboutComponent } from './components/pages/about/about.component';

const routes: Routes = [
    //the root path
    { path: '', component: ClipboardComponent },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
