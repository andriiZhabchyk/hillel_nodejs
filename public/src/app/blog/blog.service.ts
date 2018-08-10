import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<any> {
    return this._http.get('/api/posts')
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  getPost(id: string): Observable<any> {
    return this._http.get(`/api/posts/${id}`)
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  addPost(post: any): Observable<any> {
    return this._http.post(`/api/posts`, post)
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  addComment(comment: any): Observable<any> {
    return this._http.post(`/api/comments`, comment)
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }

  getComment(id: string): Observable<any> {
    return this._http.get(`/api/comments/${id}`)
      .pipe(
        map((res: Response) => res),
        catchError((err) => throwError(err))
      )
  }
}
