import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {FeedsComponent} from './feeds/feeds.component';
import {PrintPlansComponent} from './print-plans/print-plans.component';

const routes: Routes = [
  { path: 'content-dashboard', component: HeaderComponent, canActivate: [AuthGuard],
    children: [
      { path: 'feeds', component: FeedsComponent },
      { path: 'print-plan', component: PrintPlansComponent }
    ]
  },

  { path: '', component: HeaderComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
