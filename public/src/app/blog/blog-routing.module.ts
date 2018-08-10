import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from "./blog.component";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      },
      {
        path: 'posts',
        loadChildren: './posts/posts.module#PostsModule'
      },
      {
        path: 'post',
        loadChildren: './posts/post-state/post-state.module#PostStateModule'
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule {}
