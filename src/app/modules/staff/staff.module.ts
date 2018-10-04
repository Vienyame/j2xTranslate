import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@j2xT/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [StaffComponent];

export const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    data: {
      title: 'PUBLIC.STAFF.PAGE_TITLE',
      description: 'PUBLIC.STAFF.META_DESCRIPTION'
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  declarations: [...COMPONENTS]
})
export class StaffModule {}
