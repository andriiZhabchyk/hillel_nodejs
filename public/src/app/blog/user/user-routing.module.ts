import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";
import { ActivityComponent } from "./activity/activity.component";
import { UserComponent } from "./user.component";

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
