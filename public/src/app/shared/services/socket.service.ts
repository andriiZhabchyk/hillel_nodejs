import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket;
  private _baseHref = 'http://localhost:4000/';

  constructor() {}

  public initSocket(): void {
    this._socket = io(this._baseHref, {
      secure: true,
      rejectUnauthorized: false
    });
  }

  public onPosts(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('new_post', (data) => observer.next(data));
    });
  }

  public onComments(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('new_comment', (data) => observer.next(data));
    });
  }

  public onUpdateUserInfo(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('update_user_info', (data) => observer.next(data));
    });
  }
}
