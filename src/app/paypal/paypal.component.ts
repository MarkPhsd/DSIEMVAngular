import { Component, OnInit } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';

@Component({
  selector: 'pointlesscc-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;

  showCancel
  showError
  showSuccess

  categoryDescription = 'Online Order'
  currencyCode: string ='US'
  clientId    : string = 'AYMWQmVWocs14oF0DwxaiMofYBiUGUw_Qn1_5vJJX98ekNfu4FWij2taT7DNurOz_nEFse4Tjqey6KYT';
  orderTotal  : string = '0.10'

  constructor() { }
  ngOnInit(): void {
      this.initConfig();
  }

  resetStatus() {

  }

  initConfig(): void {
    this.payPalConfig = {
        currency: this.currencyCode,
        clientId: this.clientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: this.currencyCode,
                    value: this.orderTotal,
                    breakdown: {
                        item_total: {
                            currency_code: this.currencyCode,
                            value: this.currencyCode,
                        }
                    }
                },
                items: [{
                    name: 'Order Total',
                    quantity: '1',
                    category: this.categoryDescription,
                    unit_amount: {
                        currency_code: this.currencyCode,
                        value: this.currencyCode,
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;
        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
  }

}


