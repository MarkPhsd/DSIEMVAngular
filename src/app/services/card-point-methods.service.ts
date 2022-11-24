import { Injectable } from '@angular/core';
import { CardPointBoltService } from './card-point-bolt.service';
import { CardPointService } from './card-point.service';
import { Observable, of, switchMap } from 'rxjs';
import { BoltInfo, BoltTerminal } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class CardPointMethodsService {

  amount = 1;
  orderID = 1139191;
  currency = 'USD';
  retRef: string;

  ping$: Observable<any>;
  connect$: Observable<any>;
  listTerminals$: Observable<any>;
  disconnect$: Observable<any>;
  terminalDetails$: Observable<any>;

  transaction$: Observable<any>;
  transaction:any

  sale: any;
  request: any;
  terminalDetails: any;
  connect: any;
  disconnect: any;
  listTerminals: any;
  ping: any;
  processing: boolean;

  public boltInfo: BoltInfo;
  public boltTerminal: BoltTerminal;

  constructor(
    private cardPointService: CardPointService,
    private cardPointBoltService: CardPointBoltService) {
    this.boltInfo =  JSON.parse(localStorage.getItem('boltInfo'));
  }

  init() {
    this.ping$ = null;
    this.listTerminals$= null;
    this.disconnect$= null;
    this.connect = null;
    this.terminalDetails$ = null;
  }

  initTransactions() {
    this.transaction$ = null
  }

  initValues() {
    this.processing = false;
    this.sale = null;
    this.retRef = null;
  }
  getConnect() {
    const bolt = this.boltInfo;
    return  this.cardPointBoltService.connect( bolt.apiURL, bolt.hsn)
  }

  sendterminalDetails() {
    this.init()
    const bolt = this.boltTerminal
    this.listTerminals$ = this.cardPointBoltService.terminalDetails( bolt.url, bolt.hsn, bolt.xSessionKey)
  }

  sendDisconnect() {
    this.init()
    const bolt = this.boltTerminal
    this.disconnect$ = this.cardPointBoltService.disconnect( bolt.url, bolt.hsn, bolt.xSessionKey)
  }

  sendPing() {
    this.init()
    const bolt = this.boltTerminal
    this.ping$ = this.cardPointBoltService.ping(bolt.url, bolt.hsn, bolt.xSessionKey)
  }

  sendlistTerminals() {
    this.init()
    const bolt = this.boltTerminal
    this.listTerminals$ = this.cardPointBoltService.listTerminals( bolt.url, bolt.hsn, bolt.xSessionKey)
  }

  sendconnect() {
    this.init()
    const bolt = this.boltInfo;
    console.log('connecting')
    this.cardPointBoltService.connect( bolt.apiURL, bolt.hsn).subscribe(
      data => {
        this.connect = data;
        console.log('data', data)
        this.initTerminal(data.xSessionKey, data.expiry)
      }
    )
  }

  //auth and payments
  sendReadCard() {
    // this.init()
    const item = {
        "merchantId" : this.boltInfo.merchID,
        "hsn" :this.boltInfo.hsn,
        "amount" : this.amount * 100,
        "includeSignature" : "false",
        "gzipSignature" : "false",
        "signatureFormat" : "png",
        "signatureImageType" : "rgb",
        "signatureDimensions" : "320,450",
        "includeAmountDisplay" : "false",
        "confirmAmount" : "true",
        "beep" : "false",
        "aid" : "credit"
    };
    if (item) {
      const bolt = this.boltTerminal
      const connect$ = this.getConnect();
      connect$.pipe(
        switchMap(data =>  {
            this.connect = data;
            this.initTerminal(data.xSessionKey, data.expiry)
            return this.cardPointBoltService.readCard( bolt.url, item, data.xSessionKey )
          }
        )
      ).subscribe(data => {
        this.transaction = data;
      })
    }
  }

  resetAll() {
    this.init();
    this.initTransactions();
    this.sale = null;
    this.transaction = null;
    const bolt = this.boltTerminal;
    if (bolt) {
      if (this.cardPointBoltService && this.boltTerminal) {
        if (this.boltTerminal.xSessionKey) {
            const session = this.boltTerminal.xSessionKey;
            this.cardPointBoltService.cancel( bolt.url, bolt.hsn, session).subscribe(data => {
          })
        };
      }
    };
  }

  sendAuthCard(aid: string) {

    if (!this.connect) {
      console.log('Error 0 Auth Capture')
      this.sale = {errorMessage:  'Failed, No connection to device', errorCode: -1}
      return of({errorMessage: 'Failed, No connection to device', errorCode: -1})
    }

    const item = this.getAuthCardRequest(aid);
    console.log(item)
    if (!item) {
      console.log('Error 2 sendAuthCard')
      this.transaction = {errorMessage: 'Failed, no auth request', errorCode: -1}
      return of({errorMessage: 'Failed, no auth request', errorCode: -1})
    }

    const bolt = this.initTerminal(this.connect.xSessionKey, this.connect.expiry);
    return this.cardPointBoltService.authCard( bolt.url, item, this.connect.xSessionKey )
  }


  //{ "message": null, "errorcode": 0, "token": "9674338015190051", "expiry": "1222", "name": "Datacap/Test Card 02" }
  sendCompleteAuth(item: any) {
    if (item) {
    }
  }

  ///CardPointe
  // AuthCapture
  authCapture() {

    //this.connect
    if (!this.connect) {
      console.log('Error 0 Auth Capture')
      this.sale = {errorMessage:  'Failed, No connection to device', errorCode: -1}
      return of({errorMessage: 'Failed, No connection to device', errorCode: -1})
    }

    if (!this.transaction) {
      console.log('Error 1 Auth Capture')
      this.sale = {errorMessage:  'Failed, No authorization request', errorCode: -1}
      return of({errorMessage: 'Failed, No authorization request', errorCode: -1})
    }

    if (this.transaction && this.transaction?.errorMessage != 0)   {
      console.log('Error 2 Auth Capture')
      this.sale = {errorMessage: this.transaction?.errorMessage, errorCode: -1}
      return of({errorMessage: this.transaction?.errorMessage, errorCode: -1})
    }

    const item = this.getAuthCaptureRequest(this.transaction);

    if (!item) {
      console.log('Error 3 Auth Capture')
      this.sale = {errorMessage: 'Failed, no auth request response', errorCode: -1}
      return of({errorMessage: 'Failed, no auth auth request response', errorCode: -1})
    }

    const bolt = this.initTerminal(this.connect.xSessionKey, this.connect.expiry);
    const sale$ = this.cardPointService.authCapture( bolt.url, item );
    sale$.subscribe(data => {
      console.log('Auth Capture Result', data)
      this.request = item;
      this.sale =   data;
    })

  }

  refundByRetRef(retref: any) {
    const item = { retref: retref, merchID: this.boltTerminal.merchantID }
    return this.cardPointService.refundWithReference(this.boltTerminal.url, item )
  }

  voidByRetRef(retref: any) {
    const item = { retref: retref,merchID: this.boltTerminal.merchantID }
    return this.cardPointService.void(this.boltTerminal.url, item )
  }

  processSale(amount: any, orderID: any, auth: any) {

    this.amount = amount;
    this.orderID = orderID;
    const bolt = this.initTerminal(this.connect.xSessionKey, this.connect.expiry);
    if (!bolt) {
      console.log('no bolt terminal')
      return
    }
    return this.cardPointService.authCapture(bolt.url, auth)

  }

  getAuthCaptureRequest(data) {
    // return {
    //   "merchid" : this.boltInfo.merchID,
    //   "account":  data.account,
    //   "expiry" :  data.expiry, //not the expiry of the connect feature.
    //   "amount" :  this.amount * 100,
    //   "orderid":  this.orderID,
    //   "currency": this.currency,
    //   "name": "CC TEST",
    //   "capture": "y",
    //   "receipt": "n"
    // };

    return {
        "merchid": this.boltInfo.merchID,
        "account": data.token,
        "expiry":  data.expiry,
        "amount":  this.amount * 100,
        "currency": this.currency,
        "name": data?.name,
        "capture": "y",
        "receipt": "y",

    }
  }

  getAuthCardRequest(aid: string) {

    let inlcudePIN = 'false'
    if (!aid) {
      aid = 'credit'
    }
    if (aid === 'debit') {
      inlcudePIN = 'true'
    }

    return {
      "merchantId" : this.boltInfo.merchID,
      "hsn"     :  this.boltInfo.hsn,
      "amount"  : this.amount * 100,
      "orderId" : this.orderID,
      "includeSignature" : "false",
      "includeAmountDisplay" : "true",
      "beep" : "false",
      "aid"  : aid,
      "includeAVS" : "false",
      "capture" : "true",
      "clearDisplayDelay" : "500",
      'includePIN': inlcudePIN
    };

  }

  initTerminal(sessionID: string, expiry: string) {
    if (!this.boltInfo) {
      console.log('no bolt info')
      return
     };
    const  terminal = {} as BoltTerminal;
    terminal.hsn = this.boltInfo.hsn;
    terminal.merchantID = this.boltInfo.merchID;
    terminal.url = this.boltInfo.apiURL;
    terminal.xSessionKey = sessionID;
    terminal.expiry = expiry;
    this.boltTerminal = terminal;
    return terminal;
  }

}
