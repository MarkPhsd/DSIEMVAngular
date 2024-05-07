import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationPOST } from 'src/app/models/tripos';

@Injectable({
  providedIn: 'root'
})
export class TriPOSProcessingService {

  constructor(private http: HttpClient) { }


  authorization(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "createLane"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  authorizationToken(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "createLane"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  authorizationCompletion(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "createLane"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  IDLE(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "createLane"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  reboot(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "createLane"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  returnTransaction(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "createLane"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  refund(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "Refund"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }

  reversal(apiURL: string, item: AuthorizationPOST): Observable<any> {

    const controller = '/TriPOSProcessingController/'

    const endPoint = "Reversal"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.post<any>(url, item)

  }
}
