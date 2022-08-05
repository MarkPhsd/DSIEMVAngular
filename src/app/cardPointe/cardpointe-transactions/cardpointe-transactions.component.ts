import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardPointBoltService } from 'src/app/services/card-point-bolt.service';
import { BoltInfo } from 'src/app/services/card-point.service';

@Component({
  selector: 'app-cardpointe-transactions',
  templateUrl: './cardpointe-transactions.component.html',
  styleUrls: ['./cardpointe-transactions.component.scss']
})
export class CardpointeTransactionsComponent implements OnInit {

  ping$: Observable<any>;
  connect$: Observable<any>;
  listTerminals$: Observable<any>;
  disconnect$: Observable<any>;

  boltInfo: BoltInfo;

  constructor(private cardPointBoltService: CardPointBoltService,
              ) { }

  ngOnInit(): void {
    console.log('')
    this.boltInfo =  JSON.parse(localStorage.getItem('boltInfo'))
  }

  ///
  sendPing() {

    this.ping$ = this.cardPointBoltService.ping( this.boltInfo.apiURL, this.boltInfo.hsn)
  }

  sendconnect() {
    this.connect$ = this.cardPointBoltService.connect( this.boltInfo.apiURL, this.boltInfo.hsn)
  }

  sendlistTerminals() {
    this.listTerminals$ = this.cardPointBoltService.listTerminals( this.boltInfo.apiURL, this.boltInfo.hsn)
  }

  sendDisconnect() {
    this.disconnect$ = this.cardPointBoltService.disconnect( this.boltInfo.apiURL, this.boltInfo.hsn)
  }


}
