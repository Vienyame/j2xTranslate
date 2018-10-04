import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@j2xT/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import {UploadModule} from "@j2xT/modules/upload/upload.module";

const COMPONENTS = [
  HomeComponent
];

export const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'PUBLIC.HOME.PAGE_TITLE', description : 'PUBLIC.HOME.META_DESCRIPTION'}}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    UploadModule
  ],
  declarations: [...COMPONENTS]
})
export class HomeModule { }
