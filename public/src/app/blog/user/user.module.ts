import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from "./user-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CovalentFileModule } from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    UserRoutingModule,
    CovalentFileModule
  ],
  declarations: [
    ProfileComponent,
    ActivityComponent,
    UserComponent
  ]
})
export class UserModule { }
