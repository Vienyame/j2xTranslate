import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromServices from './services';
import { RouterModule } from '@angular/router';
import {CustomMaterialModule} from '@j2xT/core/custom-material-module/custom-material-module.module';
import {FormsModule} from "@angular/forms";

const COMPONENTS = [NavbarComponent];

const SERVICES = [
  fromServices.services,
  fromServices.GoogleAnalyticsEventsService,
  fromServices.PlatformDetectService,
  fromServices.LocalStorageService,
  fromServices.EnvironmentService
];

@NgModule({
  imports: [CommonModule, RouterModule, CustomMaterialModule, TranslateModule, FormsModule],
  declarations: [...COMPONENTS],
  providers: [...SERVICES],
  exports: [...COMPONENTS]
})
export class SharedModule {}
