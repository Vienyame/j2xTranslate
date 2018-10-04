import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from "@j2xT/modules/upload/container/upload.component";
import {MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {UploadService} from "@j2xT/modules/upload/services/upload.service";
import { DialogComponent } from './dialog/dialog.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@j2xT/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";

export const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    data: {
      title: 'PUBLIC.STAFF.PAGE_TITLE',
      description: 'PUBLIC.STAFF.META_DESCRIPTION'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    //BrowserAnimationsModule,
    MatProgressBarModule,

    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  providers: [UploadService],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent],
})
export class UploadModule {
}
