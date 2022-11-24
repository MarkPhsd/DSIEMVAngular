import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'payment-processing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class PointlessCCPanelComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  dsiEMVAndroid() {
    this.router.navigateByUrl('dsievmAndroid')
  }

  cardPointe() {
    this.router.navigateByUrl('cardPointSetings')
  }

  cardPointeTransactions() {
    this.router.navigateByUrl('cardpointtransactions')
  }

  cardPointeAndroid() {
    this.router.navigateByUrl('cardPointAndroid')
  }

  settings() {
    this.router.navigateByUrl('settings')
  }

}

// { path: 'dsievmAndroid',   component: DsiEMVAndroidComponent,   data: { animation: 'isLeft'} },
// { path: 'cardPointSetings', component: CardPointSettingsComponent,   data: { animation: 'isLeft'} },
// { path: 'cardPointAndroid', component: CardPointIDTECHAndroidComponent,   data: { animation: 'isLeft'} },
// { path: 'cardpointtransactions', component: CardpointeTransactionsComponent,   data: { animation: 'isLeft'} },
// ]
