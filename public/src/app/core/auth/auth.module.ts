import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }
