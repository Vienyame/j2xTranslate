import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "@j2xT/shared/services";
import {Observable} from "rxjs";
import {HttpRequestHeaders} from "@j2xT/shared";

@Injectable()
export class EditorBoardService {

  constructor(private  _http: HttpClient,
              private _environmentSvce: EnvironmentService) {
  }

  public fetchEditorTemplateFile(): Observable<any> {
    return this._http.get(this._environmentSvce.backendURL.template, HttpRequestHeaders.options(HttpRequestHeaders.defaultHeaders))
  }

}
