import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';

import {AppRoutingModule} from './core/routing';
import {NgModule} from '@angular/core';
import {AppComponent} from './core/containers/components';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {CustomSerializer, reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomMaterialModule} from './core/custom-material-module/custom-material-module.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../environments/environment';
import {SharedModule} from "@j2xT/shared/shared.module";
import {httpInterceptorProvider} from "@j2xT/core/http-interceptors";

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ngxTranslate'}),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    SharedModule
  ],
  providers: [
    httpInterceptorProvider,
    {provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

