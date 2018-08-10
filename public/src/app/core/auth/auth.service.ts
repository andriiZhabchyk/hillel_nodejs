import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.user$.asObservable();
  }

  setCurrentUser(user): void {
    this.user$.next(user);
  }

  onSignIn(user: object): Observable<any> {
    return this._http.post('/api/auth/login', user, {responseType: 'text'})
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  updateUserInfo(user): Observable<any> {
    return this._http.put('/api/user/info', user)
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  fetchUser(): Observable<any> {
    return this._http.get('/api/user/current')
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  onSignUp(user: object): Observable<any> {
    return this._http.post('/api/auth/register', user, {responseType: 'text'})
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  onLogout(): Observable<any> {
    return this._http.post('/api/auth/logout', {}, {responseType: 'text'})
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }
}
