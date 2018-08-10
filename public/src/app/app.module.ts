import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BlogModule } from "./blog/blog.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BlogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
