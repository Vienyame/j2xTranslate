import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpSentEvent,
  HttpUserEvent,
  HttpResponse,
  HttpProgressEvent,
  HttpHeaderResponse,
  HttpHandler
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    return next.handle(req);
  }
}
