import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {EnvironmentService} from "@j2xT/shared/services";
import {HttpRequestHeaders} from "@j2xT/shared";

@Injectable()
export class VienParserService {

  constructor(private _http: HttpClient,
              private _environmentSvce: EnvironmentService) {
  }

  public parser(xmlStr) {
    let parseXml;
    if (typeof DOMParser != "undefined") {
      parseXml = (new DOMParser()).parseFromString(xmlStr, 'application/xml');

    } else {
      throw new Error("No XML parser found");
    }
    return parseXml;

    /*if (typeof DOMParser != "undefined") {
     parseXml = function(xmlStr) {
       return ( new DOMParser() ).parseFromString(xmlStr, "text/xml");
     };
   } /*e if (typeof ActiveXObject != "undefined" &&
     new ActiveXObject("Microsoft.XMLDOM")) {
     parseXml = function(xmlStr) {
       var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
       xmlDoc.async = "false";
       xmlDoc.loadXML(xmlStr);
       return xmlDoc;
     };
   }else {
      throw new Error("No XML parser found");
    }*/

  }

  public vien2json(xmlData) {
    console.log('xmlData', xmlData)
    return this._http.post(this._environmentSvce.backendURL.vien2json,xmlData, HttpRequestHeaders.options(HttpRequestHeaders.xmlHeaders))
  }

}
