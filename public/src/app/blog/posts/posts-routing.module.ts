import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from "./posts.component";

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  }, {
    path: 'post',
    loadChildren: './post-state/post-state.module#PostStateModule'
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule {}
