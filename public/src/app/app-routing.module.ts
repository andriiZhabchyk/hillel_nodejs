import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './blog/blog.module#BlogModule',
  },
  {
    path: 'auth',
    loadChildren: './core/auth/auth.module#AuthModule',
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
