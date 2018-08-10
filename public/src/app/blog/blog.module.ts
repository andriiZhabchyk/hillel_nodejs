import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { RouterModule } from "@angular/router";
import { BlogRoutingModule } from "./blog-routing.module";
import { BlogComponent } from "./blog.component";
import { BlogService } from "./blog.service";
import { HttpClientModule } from "@angular/common/http";
import { AdminModule } from "./admin/admin.module";

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    CoreModule,
    AdminModule
  ],
  declarations: [
    BlogComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
