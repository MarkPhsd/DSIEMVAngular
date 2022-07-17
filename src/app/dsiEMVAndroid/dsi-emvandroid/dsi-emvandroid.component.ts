
import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Capacitor} from '@capacitor/core';
import { dsiemvandroid } from 'dsiemvandroidplugin';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { Geolocation } from '@capacitor/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { Transaction } from 'src/services/dsi-angular.service';

// https://www.npmjs.com/package/capacitor-plugin-permissions
// https://capacitorjs.com/docs/v2/plugins/android
// https://stackoverflow.com/questions/53065255/how-can-i-access-application-in-mainactivity-which-we-get-in-ionic-projects
// https://developer.android.com/guide/components/intents-common
// https://stackoverflow.com/questions/5944987/how-to-create-a-popup-window-popupwindow-in-android
// https://developer.android.com/training/basics/firstapp/starting-activity
// https://developer.cardpointe.com/cardconnect-api#rESTful-implementation
// https://stackoverflow.com/questions/28094523/cannot-find-mainactivity-for-intent-inside-cordova-plugin

@Component({
  selector: 'app-dsi-emvandroid',
  templateUrl: './dsi-emvandroid.component.html',
  styleUrls: ['./dsi-emvandroid.component.scss']
})
export class DsiEMVAndroidComponent implements OnInit {
  request       : string;
  cancelResponse: boolean;
  processRunning: boolean;

  btTransactionResponse: string;
  btcmdResponse: string;
  btTextResponse: string;

  setting: any;
  title   = 'DSIEMVAngular';
  message : any
  transactionResponse : any;
  responseURL = 'http://localhost:8080/' ;
  selected: any;

  blueToothDeviceList: any;
  btDeviceSelected  = '';
  btDeviceConnected = false;

  dsiDeviceList : any;
  secureDevice: any;

  transactionForm!: FormGroup;
  viewSelectDeviceList = false;

  ////////////////////////
  cmdResponse  = ''
  textResponse = ''

  get isAndroid() {
    const platForm =   Capacitor.getPlatform();

    if (platForm === 'android') {
      return true
    }
    return false;
  }

  constructor(
     private ngxXml2jsonService: NgxXml2jsonService,
     private btSerial: BluetoothSerial,
     private fb: FormBuilder){}

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.resetResponse();// = ''
    await this.initForm();
    await this.getDeviceInfo();
    await this.listBTDevices();
    await this.initForm();
    this.message = "...waiting for test results."
    await BleClient.initialize({ androidNeverForLocation: false });
  }

  async checkBTPermission() {
    // ACCESS_FINE_LOCATION
    await Geolocation.requestPermissions();
    this.requestBTCTPermission();
    this.requestBTPermission();
  }

  requestCameraPermission() {
      if (Capacitor.isNativePlatform()) {
          AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.CAMERA).then(
              result => {
                  if (result.hasPermission) {
                      //alert('you already have this permission')
                      alert('camera permission already granted');
                  } else {
                      alert('Camera Failed, please implement permission request')
                      AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.CAMERA);
                  }
              }
          )
      }
      else {
        alert('Capacitor CAMERA not detected');
        console.log('Capacitor not detected')
      }
  }

  requestBTCTPermission() {
    if (Capacitor.isNativePlatform()) {
      console.log('requestBTCTPermission BLUETOOTH_CONNECT')
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.BLUETOOTH_CONNECT).then(
            result => {
                console.log('requestBTCTPermission BLUETOOTH_CONNECT 2', result)
                if (result.hasPermission) {
                    //alert('you already have this permission')
                    alert('BLUETOOTH_CONNECT permission already granted');
                } else {
                    alert('BLUETOOTH_CONNECT Failed, please implement permission request')
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.BLUETOOTH_CONNECT);
                }
            }
        )
    }
    else {
      alert('Capacitor BLUETOOTH_CONNECT not detected');
      console.log('Capacitor not detected')
    }
  }

  requestBTPermission() {
    if (Capacitor.isNativePlatform()) {
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.BLUETOOTH).then(
            result => {
                if (result.hasPermission) {
                    //alert('you already have this permission')
                    alert('BLUETOOTH permission already granted');
                } else {
                    alert('BLUETOOTH Failed please implement permission request')
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.BLUETOOTH);
                }
            }
        )
    }
    else {
      alert('Capacitor BLUETOOTH not detected');
      console.log('Capacitor not detected')
    }
  }

  async listBTDevices() {
    //This will return a list of bluetooth devices
    this.blueToothDeviceList = await this.btSerial.list();
  }

  async getDeviceInfo() {
    try {

      const form = this.transactionForm;
      const options = form.value as Transaction;
      options.merchantID = options.merchantID;
      options.pinPadIpAddress = options.pinPadIpAddress;
      options.padPort = options.padPort;

      const item    = await dsiemvandroid.getDeviceInfo(options);
      const results = item as any;

      const parser = new DOMParser();
      results.value = results.value.replace('#', '')
      const xml = parser.parseFromString(results.value, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;
      this.dsiDeviceList = obj;
      console.log('devices', obj);

    } catch (error) {
      this.message = error;
    }
  }

  async initForm() {
    const options = { value: ' value.'}
    const ipValue = await dsiemvandroid.getIPAddressPlugin(options)
    const ipAddress = ipValue?.value;
    const item = this.getSavedSettings();

    this.transactionForm = this.fb.group({
      merchantID: ['CAFECSAND3GP'],
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

    if (item) {
      this.transactionForm.patchValue(item)
    }

    this.setBtDevice(item?.bluetoothDeviceName)
    this.subscribeChanges();
  }

  subscribeChanges() {
    this.transactionForm.valueChanges.subscribe( data => {
      this.savedSettings();
    })
  }

  getSavedSettings(): Transaction | undefined {
    const setting = localStorage.getItem('DSIEMVSetting')
    if (setting) {
      const item = JSON.parse(setting) as Transaction;
      this.setting = item;
      return item
    }
  }

  savedSettings() {
    if (this.transactionForm && this.transactionForm.value) {
      const item = this.transactionForm.value;
      this.saveSetting(item)
    }
  }

  saveSetting(item: any) {
    const setting = JSON.stringify(item);
    localStorage.setItem('DSIEMVSetting', setting);
  }

  async resetResponse() {
    this.cmdResponse = '';
    this.textResponse = '';

    if (this.processRunning) {
      this.cancelResponse = true;
    }

    const options = {value:''}
    await dsiemvandroid.setResponse(options);
  }

  async resetbtResponse() {
    this.btTextResponse = '';
    this.btcmdResponse = '';

    if (this.processRunning) {
      this.cancelResponse = true;
    }
    const options = {value:''}
    await dsiemvandroid.setbtResponse(options);
  }

  async refreshDevices() {
    await this.resetResponse();
    await this.getDeviceInfo();
    await this.listBTDevices();
    this.initForm();
  }

  setBtDevice(value: any) {
    this.selected         = value;
    this.btDeviceSelected = this.selected;
  }

  async connectToBTDevice() {

    if (!this.btDeviceConnected && this.btDeviceSelected) {
      await this.resetbtResponse();
      this.processRunning = true;

      this.message = 'Connecting to device. ' + this.btDeviceSelected
      const options = {'bluetoothDeviceName': this.btDeviceSelected};

      try {
        dsiemvandroid.connectToBT(options);
        this.checkbtResponse();
      } catch (error) {
        console.log('response', error)
      }
    }
  }

  async disConnectToBTDevice() {
    if (this.btDeviceConnected && this.btDeviceSelected) {
      await this.resetResponse();
      const options = {'bluetoothDeviceName': this.btDeviceSelected};
      const item = await dsiemvandroid.disconnectFromBt(options);
      await this.checkbtResponse();
    }
  }

  async removeBTDevice() {
    let setting = this.getSavedSettings();
    setting.bluetoothDeviceName = '';
    this.saveSetting(setting);
    this.refreshDevices();
  }

  async setSecureDevice(event: any) {
    await this.resetResponse();
    let setting = this.getSavedSettings() as Transaction;

    setting.secureDevice = event[0];
    this.saveSetting(setting);
    this.initForm();
  }

  async getIPAddress() {
    try {
      await this.resetResponse();
      const options = { value: ' value.'}
      const item = await dsiemvandroid.getIPAddressPlugin(options)
      this.message = item?.value;
    } catch (error) {
      this.message = error;
    }
  }

  async dsiEMVReset() {
    try {
      await this.resetResponse();
      this.processRunning = true;
      const setting = this.getSavedSettings() as Transaction;
      let options = {} as any;
      options =  { bluetoothDeviceName: setting.bluetoothDeviceName, secureDevice: setting.secureDevice, merchantID: setting.merchantID,
                   pinPadIpAddress: setting.pinPadIpAddress, padPort: setting.padPort }
      const item = await dsiemvandroid.emvPadReset(options)
      // await this.checkResponse();
    } catch (error) {
      this.message = error;
    }
  }

  connect(item: any)
  {
    //This will connect to bluetooth printer via the mac address provided
    this.selected = item;
  }


  async btDisconnect() {
    try {
      await this.resetResponse();
      this.processRunning = true;
      const options = this.transactionForm.value as any;

      options.merchantID = options.merchantID;
      options.pinPadIpAddress = options.pinPadIpAddress;
      options.padPort = options.padPort;

      const item = await dsiemvandroid.disconnectFromBt(options)
      this.message = item;

      await this.checkResponse();
    } catch (error) {
      this.message = error;
    }
  }

  async emvParamDownload() {
    try {
      await this.resetResponse();
      this.processRunning = true;
      const options = this.transactionForm.value as any;

      options.merchantID = options.merchantID;
      options.pinPadIpAddress = options.pinPadIpAddress;
      options.padPort = options.padPort;

      const item = await dsiemvandroid.emvParamDownload(options)
      this.message = item;

      await this.checkResponse();
    } catch (error) {
      this.message = error;
    }
  }

  async  checkResponse() {
    let responseSuccess = ''
    let request = ''
    while (request === '') {
      request = await this.getRequest();
      this.request = request;
    }

    while (responseSuccess === '') {
      const value = {value: 'get'}
      const item = await this.getResponse();
      if (item) {
        if (item.value != '' || this.cancelResponse) {
          this.cancelResponse = false;
          this.processRunning = false;
          responseSuccess     = 'complete'
          return;
        }
      }
    };
  }

  async getResponse(){
    const options = {'response': ''};
    const item = await dsiemvandroid.getResponse(options);
    if (item.value) {
      if (item.value.substring(0, 5) === '<?xml' || item.value.substring(0, 5) === '<RStr') {

        const parser = new DOMParser();
        item.value =  item?.value.replace('#', '')

        const xml = parser.parseFromString(item.value, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;
        console.log('object 1', obj?.RStream)
        console.log('object 2', obj?.CmdResponse)

        if (item.value.substring(0, 5) === '<?xml' ) {
          this.cmdResponse = obj?.RStream?.CmdResponse.CmdStatus;
          this.textResponse = obj?.RStream?.CmdResponse.TextResponse;
        }
        if (item.value.substring(0, 5) === '<RStr') {
          this.cmdResponse = obj?.CmdResponse.CmdStatus;
          this.textResponse = obj?.CmdResponse.TextResponse;
        }
        return  item ;
      }
    }
    this.transactionResponse = item?.value;
  }

  async getRequest() {
    const options = {'response': ''};
    let item = await dsiemvandroid.getRequest(options);
    if (item.value) {
      if (item.value.substring(0, 5) === '<?xml' || item.value.substring(0, 5) === '<RStr') {

        item.value =  item?.value.replace('#', '')
        item.value =  item?.value.replace('\n', '')

        const parser = new DOMParser();

        const xml = parser.parseFromString(item.value, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;

        return  obj
      }

    }
    if (item) {
      item.value =  item?.value.replace('\n', '')
    }
    return  item
  }

  async  checkbtResponse() {
    let responseSuccess = ''
    while (responseSuccess === '') {
      const value = {value: 'get'}
      const item = await this.getbtResponse();

      if ((item && item.value != '') || this.cancelResponse) {
        this.cancelResponse = false;
        this.processRunning = false;
        responseSuccess = 'complete'
        this.message = '';
        this.request = '';
        return;
      }
    };
  }

  async getbtResponse(){
    const options = {'response': ''};
    const item = await dsiemvandroid.getbtResponse(options);
    console.log('getbtResponse 1', item)
    try {
      if (item.value) {
        if (item.value.substring(0, 5) === '<?xml' ||  item.value.substring(0, 5) === '<TStr' || item.value.substring(0, 5) === '<RStr') {
          this.cancelResponse = true;
          const parser = new DOMParser();
          item.value =  item?.value.replace('#', '')
          console.log('bt response', item.value )

          const xml = parser.parseFromString(item.value, 'text/xml');
          const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;

          console.log('cmdResponse', obj?.RStream?.CmdResponse)
          console.log('cmdResponse', obj?.RStream?.CmdResponse.TextResponse)

          if (item.value.substring(0, 5) === '<RStr') {
            this.cmdResponse = obj?.RStream?.CmdResponse.CmdStatus;
            this.textResponse = obj?.RStream?.CmdResponse.TextResponse;
          }
          if (item.value.substring(0, 5) === '<?xml') {
            this.cmdResponse = obj?.CmdResponse.CmdStatus;
            this.textResponse = obj?.CmdResponse.TextResponse;
          }
          this.cancelResponse = false;
          this.processRunning = false;
          return item;
        }
      }
    } catch (error) {
      this.cancelResponse = false;
      this.processRunning = false;
    }

    this.message = item;
    this.transactionResponse = item?.value;

  }

  async emvCancel() {
    try {
      await this.resetResponse();
      this.cancelResponse = true;
      this.processRunning = false;
      const options = { value: ' value.'}
      const item    = await dsiemvandroid.cancelTransaction(options)
      this.message  = ''
      this.request  = ''
      this.transactionResponse =  '';
    } catch (error) {
      this.message = error;
    }
  }

  async emvSale() {
    try {
      await this.resetResponse();
      this.processRunning = true;

      const options = this.initTransaction();
      console.log('options', options)
      const item = await dsiemvandroid.processSale(options)

      this.checkResponse();

    } catch (error) {
      this.message = error;
    }
  }

  async emvReturn() {
    try {
      await this.resetResponse();
      this.processRunning = true;
      const options = { value: ' value.'}
      const item = await dsiemvandroid.processReturn(options)
      this.getResponse();

    } catch (error) {
      this.message = error;
    }
  }

  async openPlugin() {
    // const item = await dsiemvandroid.openEMV()
  }

  initTransaction(): any {
    const amount       = '1.00';
    const item         = {} as any;
    const value        = this.transactionForm.value as Transaction;
    item.pOSPackageID  = 'pointlesspos1.0'
    item.padPort       = value.padPort;
    item.pinPadIpAddress = value.pinPadIpAddress;
    item.amount        = amount;
    if (value.bluetoothDeviceName) {
      item.secureDevice  = value.secureDevice;
    }
    if (!value.bluetoothDeviceName) {
      item.secureDevice  = value.bluetoothDeviceName;
    }

    item.merchantID    = value.merchantID;
    return item;
  }


}
