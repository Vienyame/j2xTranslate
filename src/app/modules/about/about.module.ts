import { SharedModule } from '@j2xT/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

const COMPONENTS = [AboutComponent];

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      title: 'PUBLIC.ABOUT.PAGE_TITLE',
      description: 'PUBLIC.ABOUT.META_DESCRIPTION'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule /* ,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }) */
  ],
  declarations: [...COMPONENTS]
})
export class AboutModule {}

/* export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/about/', '.json');
}*/
