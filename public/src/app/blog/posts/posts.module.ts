import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from "./posts-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { PostStateModule } from "./post-state/post-state.module";

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    PostStateModule
  ],
  declarations: [
    PostsComponent
  ]
})
export class PostsModule { }
