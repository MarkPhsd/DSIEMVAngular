import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction } from 'src/app/models/models';
import { dsiemvandroid } from 'dsiemvandroidplugin';
import { PointlessCCDSIEMVAndroidService } from 'src/app/services/dsiemvandroid.service';

@Component({
  selector: 'pointlesscc-dsiandroid-settings',
  templateUrl: './dsiandroid-settings.component.html',
  styleUrls: ['./dsiandroid-settings.component.scss']
})
export class DSIAndroidSettingsComponent implements OnInit {

  @Output() getDSISettings = new EventEmitter();
  @Input() setDSISettings: Transaction;

  inputForm: FormGroup;
  blueToothDeviceList: any;
  dsiDeviceList: any;
  viewSelectDeviceList: boolean;

  constructor(private fb: FormBuilder,
              private dSIEMVAndroidService: PointlessCCDSIEMVAndroidService) { }

  async ngOnInit() {
    this.blueToothDeviceList = await this.dSIEMVAndroidService.listBTDevices();
    this.dsiDeviceList = await this.dSIEMVAndroidService.getDeviceInfo();
    this.initForm();
  }

  async initForm() {
    const options = { value: ' value.'}
    const ipValue = await dsiemvandroid.getIPAddressPlugin(options)
    const ipAddress = ipValue?.value;
    this.inputForm = this.fb.group({
      merchantID: ['CROSSCHAL1GD'],
      userTrace: ['User'],
      pOSPackageID: ['PointlessPOS1.0'],
      tranCode: ['EMVSale'],
      secureDevice: ['EMV_VP3300_DATACAP'],
      invoiceNo: ['100'],
      sequenceNo: ['0010010010'],
      bluetoothDeviceName: [''],
      operationMode: ['cert'],
      amount: ['1.00'],
      recordNo: ['RecordNumberRequested'],
      refNo: ['1'],
      pinPadIpAddress: [ipAddress],
      padPort: ['1200'],
    })

    let item = this.dSIEMVAndroidService.savedSettings;
    if (this.setDSISettings) {
      item = this.setDSISettings;
    }

    if (item) {
      console.log(item)
      this.inputForm.patchValue(item)
      this.saveSettings();
    }

    this.subscribeChanges();
    this.checkBTPermission();

  }

  async checkBTPermission() {
    const options = {value: 'test'};
    dsiemvandroid.getHasPermission(options)
  }

  subscribeChanges() {
    this.inputForm.valueChanges.subscribe( data => {
      this.saveSettings();
    })
  }

  saveSettings() {
    if (this.inputForm && this.inputForm.value) {
      const item = this.inputForm.value;
      const setting = JSON.stringify(item);
      localStorage.setItem('DSIEMVSetting', setting);
      this.getDSISettings.emit(setting)
    }
  }

  async setSecureDevice(event: any) {
    let setting =  this.dSIEMVAndroidService.savedSettings as Transaction;
    setting.secureDevice = event[0];
  }

}
