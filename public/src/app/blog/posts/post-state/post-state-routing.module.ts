import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from "./view-post/view-post.component";
import { AddEditPostComponent } from "./add-edit-post/add-edit-post.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view/:id',
        component: ViewPostComponent
      },
      {
        path: 'add',
        component: AddEditPostComponent
      },
      {
        path: 'edit/:id',
        component: AddEditPostComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostStateRoutingModule {}
