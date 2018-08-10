import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogService } from "../../../blog.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../core/auth/auth.service";
import { SocketService } from "../../../../shared/services/socket.service";
import {take, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  public post: any;

  @ViewChild('commentInput') _commentInput: ElementRef;

  constructor(private _blogService: BlogService,
              private _route: ActivatedRoute,
              private _authService: AuthService,
              private _socketService: SocketService) { }

  ngOnInit() {
    const postId: string = this._route.snapshot.params.id;

    this._blogService.getPost(postId)
      .subscribe(post => {
        console.log(post);
        this.post = post;
      });

    this._socketService
      .onComments()
      .pipe(
        switchMap((msg) => this._blogService.getComment(msg.commentId))
      )
      .subscribe(comment => {
        this.post.comments.unshift(comment);
      });
  }

  onAddComment(ev): void {
    const input = this._commentInput.nativeElement;
    if (input.value && (ev.key === 'Enter' || ev instanceof MouseEvent)) {
      const body = input.value;
      input.value = '';

      this._blogService.addComment({ body, postId: this.post._id })
        .subscribe(res => {
          console.log(res);
        });
    }
  }

}
