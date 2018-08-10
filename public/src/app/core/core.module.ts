import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from "./auth/auth.module";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
