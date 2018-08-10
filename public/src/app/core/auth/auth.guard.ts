import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    return
  }
}
