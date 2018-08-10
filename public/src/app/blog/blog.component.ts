import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from "../shared/services/socket.service";
import { AuthService } from "../core/auth/auth.service";
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SidebarComponent } from "../core/sidebar/sidebar.component";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public user$: Observable<any>;

  @ViewChild('sidenav') _sidenav: any;
  public isOpenned = false;

  constructor(private _socketService: SocketService,
              private _authService: AuthService) {
    this.user$ = this._authService.getCurrentUser();
  }

  ngOnInit() {
    this._authService.fetchUser()
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this._authService.setCurrentUser(user);
      });

    this._socketService.initSocket();
  }

  onToggleSidenav() {
    this._sidenav.toggle();
  }

}
