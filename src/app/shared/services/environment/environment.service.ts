import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable()
export class EnvironmentService {
  private _backendURL: any;

  constructor() {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);

  }

  get backendURL(){
    return this._backendURL;
  }

}
