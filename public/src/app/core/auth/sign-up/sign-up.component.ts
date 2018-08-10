import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user = {
    username: '',
    email: '',
    password: ''
  };

  public passwordConfirm = false;

  @ViewChild('signUpForm') _form: NgForm;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  onSignUp() {
    this._authService.onSignUp(this.user)
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

  checkPassword() {
    if (!this.user.password || !this._form.controls.confirmPassword.value) {
      return;
    }

    this.passwordConfirm = this.user.password === this._form.controls.confirmPassword.value;
  }

}
