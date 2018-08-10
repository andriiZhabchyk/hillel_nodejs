import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { take } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user = {
    email: '',
    password: ''
  };

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() { }

  onSignIn() {
    this._authService.onSignIn(this.user)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }



}
