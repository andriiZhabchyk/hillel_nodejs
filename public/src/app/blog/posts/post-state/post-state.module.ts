import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { PostStateRoutingModule } from "./post-state-routing.module";
import { SharedModule } from "../../../shared/shared.module";

import { CovalentFileModule } from '@covalent/core/file';

@NgModule({
  imports: [
    CommonModule,
    PostStateRoutingModule,
    FormsModule,
    SharedModule,
    CovalentFileModule
  ],
  declarations: [
    AddEditPostComponent,
    ViewPostComponent
  ]
})
export class PostStateModule { }
