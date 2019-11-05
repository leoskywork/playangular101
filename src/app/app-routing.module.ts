import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { Constants } from './common/constants'
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
    //the root path
    { path: Constants.routeRoot, component: ClipboardComponent },
    { path: Constants.routeClipboard, component: ClipboardComponent },
    { path: Constants.routeAbout, component: AboutComponent },
    { path: Constants.routeFaq, component: FaqComponent },
    { path: Constants.routeLogin, component: LoginComponent },

    //add new route rules above this
    { path: Constants.routeTest, component: TestComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
