import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PaypalService } from 'src/services/paypal.service';

@Component({
  selector: 'pointlesscc-paypal-settings',
  templateUrl: './paypal-settings.component.html',
  styleUrls: ['./paypal-settings.component.scss']
})
export class PaypalSettingsComponent implements OnInit {

  inputForm: UntypedFormGroup;

  constructor(private fb : UntypedFormBuilder,
              public paypalService: PaypalService) { }

  ngOnInit(): void {
  }

  initForm() {
    this.inputForm = this.fb.group({
      name: [],
      key: []
    })
  }

}
