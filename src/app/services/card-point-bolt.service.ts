import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CardPointGateWay {
  site: string;
  url: string;
  csurl: string;
  merchid: string;
  currency: string;
  expiry: string;
  account: string;
  token: string;
  retref: string;
  profileid: string;
  acctid: string;
  batchid: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})

export class CardPointBoltService {

  constructor(private http: HttpClient) { }

  getCardPointBolt(apiURL: string, hsn: string): Observable<CardPointGateWay> {

    const controller = '/cardpointe/'

    const endPoint = "getCardPointBolt"

    const parameters = `?hsn=${hsn}`

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.get<CardPointGateWay>(url)

  }

  ping(apiURL: string, hsn: string): Observable<CardPointGateWay> {

    const controller = '/CardPointeBolt/'

    const endPoint = "PingTerminal"

    const parameters = `?hsn=${hsn}`

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    console.log(url)

    return this.http.get<CardPointGateWay>(url)

  }

  connect(apiURL: string, hsn: string): Observable<CardPointGateWay> {

    const controller = '/CardPointeBolt/'

    const endPoint = "connect"

    const parameters = `?hsn=${hsn}`

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.get<CardPointGateWay>(url)

  }

  listTerminals(apiURL: string, hsn: string): Observable<CardPointGateWay> {

    const controller = '/CardPointeBolt/'

    const endPoint = "listTerminals"

    const parameters = `?hsn=${hsn}`

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.get<CardPointGateWay>(url)

  }

  disconnect(apiURL: string, hsn: string): Observable<CardPointGateWay> {

    const controller = '/CardPointeBolt/'

    const endPoint = "disconnect"

    const parameters = `?hsn=${hsn}`

    const url = `${apiURL}${controller}${endPoint}${parameters}`

    return this.http.get<CardPointGateWay>(url)

  }


}
