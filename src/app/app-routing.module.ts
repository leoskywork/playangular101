import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { Constants } from './common/constants'

const routes: Routes = [
    //the root path
    { path: Constants.routeRoot, component: ClipboardComponent },
    { path: Constants.routeClipboard, component: ClipboardComponent },
    { path: Constants.routeAbout, component: AboutComponent },
    { path: Constants.routeFaq, component: FaqComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
