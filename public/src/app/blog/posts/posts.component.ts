import { Component, OnInit } from '@angular/core';
import { BlogService } from "../blog.service";
import { AuthService } from "../../core/auth/auth.service";
import { Observable } from "rxjs/internal/Observable";
import { SocketService } from "../../shared/services/socket.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts = [];
  public user$: Observable<any>;

  constructor(private _blogService: BlogService,
              private _authService: AuthService,
              private _socketService: SocketService) {
    this.user$ = this._authService.getCurrentUser();
  }

  ngOnInit() {
    this._blogService.getPosts()
      .subscribe(posts => {
        console.log(posts);
        this.posts = [...posts];
      });

    this._socketService
      .onComments()
      .subscribe(msg => {
        const post = this.posts.find(p => p._id === msg.postId);
        post.comments.push(msg.commentId);
      });

    this._socketService
      .onPosts()
      .pipe(
        switchMap((msg) => this._blogService.getPost(msg.postId))
      )
      .subscribe(post => {
        this.posts.unshift(post);
      });
  }

}
