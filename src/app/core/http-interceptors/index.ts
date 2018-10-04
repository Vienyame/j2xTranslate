import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop-interceptors';
import { UniversalInterceptor } from './universal-interceptors';

export const httpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
];

export const  universalInterceptorProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: UniversalInterceptor,
  /* Multi is important or you will delete all the other interceptors */
  multi: true
}];
