import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardPointMethodsService } from 'src/app/services/card-point-methods.service';

@Component({
  selector: 'app-cardpointe-transactions',
  templateUrl: './cardpointe-transactions.component.html',
  styleUrls: ['./cardpointe-transactions.component.scss']
})
export class CardpointeTransactionsComponent implements OnInit, OnDestroy {

  sale$: Observable<any>;
  auth$: Observable<any>;

  // private sale: Subscription;
  private _sale               = new BehaviorSubject<number>(null);
  public itemProcessSection$  = this._sale.asObservable();


  constructor(  public methodsService: CardPointMethodsService
              ) { }

  ngOnInit(): void {
    this.connectToBolt()
    this.processSale();
  }

  connectToBolt() {
    return this.methodsService.getConnect().subscribe( data => {
        this.methodsService.connect = data
        this.methodsService.initTerminal(data.xSessionKey, data.expiry);
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if ( this._sale) { this._sale.unsubscribe()}
  }



  processSale() {
    this._sale.subscribe(data => {
      const bolt = this.methodsService.initTerminal(this.methodsService.connect.xSessionKey, this.methodsService.connect.expiry);
      const auth = this.methodsService.getAuthCaptureRequest(data)
      this.methodsService.processSale(this.methodsService.amount, this.methodsService.orderID, auth)
      .subscribe(data => {
        this.methodsService.processing = false;
        this.methodsService.sale = data;
        this.methodsService.retRef = data?.retref
      })
    })
  }

  processVoid(retRef) {
    this.methodsService.processing = true;
    this.methodsService.voidByRetRef(retRef)
    .subscribe(data => {
      this.methodsService.processing = false;
      this.methodsService.sale = data;
      this.methodsService.retRef = data?.retref
    })
  }

  refundByRetRef(retRef) {
    this.methodsService.processing = false;
    console.log('refund by RetRef')
    this.methodsService.refundByRetRef(retRef)
    .subscribe(data => {
      this.methodsService.processing = true;
      this.methodsService.sale = data;
      this.methodsService.retRef = data?.retref
    })
  }

  sendAuthCard() {
    this.methodsService.initValues()
    this.methodsService.processing = true;
    this.methodsService.sendAuthCard(null).subscribe(data => {
      this.methodsService.processing = false;
      this.methodsService.transaction = data;
      this.methodsService.retRef = data?.retref
    })
  }

  sendAuthCardAndCapture() {
    this.methodsService.initValues()
    this.methodsService.processing = true;
    this.methodsService.sendAuthCard(null).subscribe(data => {
      this._sale.next(data)
    })
  }

  pinDebitSaleAuthCapture(){
    this.methodsService.initValues()
    this.methodsService.processing = true;
    this.methodsService.sendAuthCard('debit').subscribe(data => {
      this._sale.next(data)
    })
  }
}
