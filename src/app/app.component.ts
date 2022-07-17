import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

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

}

