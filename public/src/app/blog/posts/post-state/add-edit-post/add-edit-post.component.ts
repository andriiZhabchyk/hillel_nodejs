import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from "../../../blog.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { switchMap } from "rxjs/operators";
import { MatStepper } from "@angular/material";
import {IUploadOptions, TdFileService} from "@covalent/core";

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.css'],
  providers: [ TdFileService ]
})
export class AddEditPostComponent implements OnInit {

  public post = {
    title: '',
    body: '',
    tags: []
  };
  public file: File;

  public fileSelected = false;
  public selectedStep = 0;
  public postId: string = null;
  public successUpload = false;

  @ViewChild('stepper') _stepper: MatStepper;

  constructor(private _blogService: BlogService,
              private _authService: AuthService,
              private _fileUploadService: TdFileService) { }

  selectEvent(): void {
    this.fileSelected = true;
  }

  uploadEvent(file: File): void {
    if (file instanceof File) {
      const formData = new FormData();
      formData.append("post_images", file);

      const options: IUploadOptions = {
        url: `/api/files/images/${this.postId}`,
        method: 'post',
        formData
      };
      this._fileUploadService
        .upload(options)
        .subscribe((response) => {
          this.successUpload = response === 'OK';
        });
    }
  }

  ngOnInit() { }

  onAddTag(ev) {
    if (ev.key === 'Enter') {
      this.post.tags.push(`#${ev.target.value}`);
      ev.target.value = '';
    }
  }

  onAddPost() {
    this._authService.getCurrentUser()
      .pipe(
        switchMap((user) => this._blogService.addPost({
          addedBy: user._id,
          ... this.post
        }))
      )
      .subscribe(result => {
        if (result && result.postId) {
          this.postId = result.postId;
          this._stepper.next();
        }
      });
  }

  onStepChange(ev): void {
    this.selectedStep = ev.selectedIndex;
  }

}
