import {HttpHeaders} from "@angular/common/http";

export class HttpRequestHeaders {

  static get defaultHeaders() {
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }

  /*{
    'Content-Type': 'application/xml', //<- To SEND XML
    'Accept': 'application/json',       //<- To ask for XML
    'Response-Type': 'text'             //<- b/c Angular understands text
  }*/
  static get xmlHeaders() {
    return {
      'Content-Type': 'application/xml', //<- To SEND XML
      'Accept': 'application/json',       //<- To ask for XML
      'Response-Type': 'text'             //<- b/c Angular understands text
    }
  }

    /**
     * Function to return request options
     * @param headerList
     * @private
     */
  static
    options(headerList
  :
    Object = {}
  )
    {
      let headers: HttpHeaders = new HttpHeaders();

      for (let prop in headerList) {

        if (!headerList.hasOwnProperty(prop)) {
          continue;
        }
        if (headerList[prop] === undefined) {
          continue;
        }
        headers = headers.append(`${prop}`, `${headerList[prop]}`);
      }

      return {
        headers: headers
      };
    }

  }

