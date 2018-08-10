import { Component, OnInit } from '@angular/core';
import { IUploadOptions, TdFileService } from '@covalent/core';
import { AuthService } from "../../../core/auth/auth.service";
import { Observable } from 'rxjs';
import {skipWhile} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public file: File;
  private user$: Observable<any>;
  private user = {
    username: '',
    email: '',
    password: '',
    descr: ''
  };

  constructor(private _fileUploadService: TdFileService,
              private _authService: AuthService) {
    this.user$ = this._authService.getCurrentUser();
  }

  ngOnInit() {
    this.user$
      .pipe(
        skipWhile((user) => !user)
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  uploadEvent(file: File): void {
    if (file instanceof File) {
      const formData = new FormData();
      formData.append('user_avatar', file);

      const options: IUploadOptions = {
        url: `/api/files/avatar`,
        method: 'post',
        formData
      };
      this._fileUploadService
        .upload(options)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  onUpdateProfile() {
    const user = this.prepareUserInfo();
    this._authService.updateUserInfo(user)
      .subscribe((res) => {
        console.log(res);
      });
  }

  prepareUserInfo(): Object {
    let user = {};
    Object.keys(this.user).map(prop => {
      if (!!this.user[prop]) {
        user[prop] = this.user[prop];
      }
    });
    return user;
  }

}
