import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationPOST, AuthorizationResponse } from 'src/app/models/tripos';

@Injectable({
  providedIn: 'root'
})
export class TriPOSLaneService {

  constructor(private http: HttpClient) { }

  createLane(apiURL: string, item: AuthorizationPOST): Observable<AuthorizationResponse> {

      const controller = '/TriPOSLane/'

      const endPoint = "createLane"

      const parameters = ``

      const url = `${apiURL}${controller}${endPoint}${parameters}`

      return this.http.post<any>(url, item)

  };

  getLanes(apiURL: string): Observable<any> {

    const controller = '/TriPOSLane/'

    const endPoint = "GetLanes"

    const parameters = ``

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.get<any>(url)

};


}
