import { NgModule } from '@angular/core';
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
