import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs/internal/Observable";
import { take } from 'rxjs/operators';
import { SocketService } from "../../shared/services/socket.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<any>;
  private user: any;

  @Output()
    sidenavToggled = new EventEmitter<any>();

  constructor(private _router: Router,
              private _authService: AuthService,
              private _socketService: SocketService) {
    this.user$ = this._authService.getCurrentUser();
  }

  ngOnInit() {
    this.user$
      .subscribe((user) => {
        this.user = user;
      });

    this._socketService
      .onUpdateUserInfo()
      .subscribe(msg => {
        if (msg.userId === this.user._id) {
          window.location.reload();
        }
      });
  }

  toggleSidenav() {
    this.sidenavToggled.emit();
  }

  onLogout() {
      this._authService.onLogout()
        .pipe(
          take(1)
        )
        .subscribe(() => {
          this._authService.setCurrentUser(null);
          this._router.navigate(['/']);
        });
  }
}
