import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoltInfo } from 'src/app/models/models';
import { CardPointMethodsService } from  'src/app/services/card-point-methods.service';
import { DeviceInfoService } from 'src/app/services/device-info.service';

@Component({
  selector: 'app-card-point-settings',
  templateUrl: './card-point-settings.component.html',
  styleUrls: ['./card-point-settings.component.scss']
})
export class CardPointSettingsComponent implements OnInit {

  deviceName : string;
  inputForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    public methodsService: CardPointMethodsService,
    public deviceInfoService: DeviceInfoService) {
  }

  ngOnInit(): void {
    this.deviceName = this.deviceInfoService.deviceName;
    const item = localStorage.getItem('boltInfo');
    const boltInfo =  JSON.parse(item) as BoltInfo;
    this.initForm();

    if (boltInfo) {
      this.inputForm.patchValue(boltInfo);
    }
    if (!boltInfo) {
      const item = {} as BoltInfo
      this.inputForm.patchValue(item);
    }
  }

  initForm() {
    this.inputForm = this.fb.group({
      deviceName: [],
      hsn: [],
      merchID: [],
      apiURL: [],
    })
    return this.inputForm;
  }

  save() {
    const bolt = this.inputForm.value as BoltInfo;
    if (bolt) {
      const item = JSON.stringify(bolt)
      localStorage.setItem('boltInfo', item)
      this.methodsService.boltInfo = bolt;
    }
    this.deviceInfoService.setDeviceName(this.deviceName)
  }

}
