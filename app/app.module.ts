import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { PassengerDashboardModule } from './passenger-dashboard/passenger-dashboard.module';
import { RouterModule, Route } from '@angular/router'
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';


const routes: Route[] = [
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [
    //Angular Modules
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    //Custom Modules
    PassengerDashboardModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ]
})
export class AppModule {}
