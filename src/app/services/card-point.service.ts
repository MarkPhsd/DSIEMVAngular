import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BoltTerminal {
  site: string;
  url: string;
  authorization: string;
  merchantID: string;
  hsn: string;
  XCardConnectSessionKey: string;
}

export interface BoltInfo {
  hsn: string;
  merchID: string;
  deviceName: string;
  apiURL: string;
}


@Injectable({
  providedIn: 'root'
})

export class CardPointService {

  constructor(private http: HttpClient) { }


}
