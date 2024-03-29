
import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Capacitor} from '@capacitor/core';
import { TranResponse, Transaction } from 'src/app/models/models';
import { dsiemvandroid } from 'dsiemvandroidplugin';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { PointlessCCDSIEMVAndroidService } from 'src/app/services/dsiemvandroid.service';
import { from } from 'rxjs';

// https://www.npmjs.com/package/capacitor-plugin-permissions
// https://capacitorjs.com/docs/v2/plugins/android
// https://stackoverflow.com/questions/53065255/how-can-i-access-application-in-mainactivity-which-we-get-in-ionic-projects
// https://developer.android.com/guide/components/intents-common
// https://stackoverflow.com/questions/5944987/how-to-create-a-popup-window-popupwindow-in-android
// https://developer.android.com/training/basics/firstapp/starting-activity
// https://developer.cardpointe.com/cardconnect-api#rESTful-implementation
// https://stackoverflow.com/questions/28094523/cannot-find-mainactivity-for-intent-inside-cordova-plugin

@Component({
  selector: 'pointlesscc-dsi-emvandroid',
  templateUrl: './dsi-emvandroid.component.html',
  styleUrls: ['./dsi-emvandroid.component.scss']
})
export class DsiEMVAndroidComponent implements OnInit {

  @Input() isAdmin = true;
  @Input() isManager: boolean;
  @Input() transaction: Transaction;
  @Output() getTranResponse = new EventEmitter();
  @Output() getCmdResponse = new EventEmitter();

  request       : string;
  cancelResponse: boolean;
  processRunning: boolean;
  messageResponse: string;

  btTransactionResponse: string;
  btcmdResponse: string;
  btTextResponse: string;

  setting: any;
  title   = 'DSIEMVAngular';
  message : any
  transactionResponse : any;
  responseURL = 'http://localhost:8080/' ;
  selected: any;
  hideRequest = true;
  // blueToothDeviceList: any;
  btDeviceSelected  = '';
  btDeviceConnected = false;

  dsiDeviceList : any;
  secureDevice: any;

  viewSelectDeviceList = false;

  ////////////////////////
  cmdResponse  :any;
  textResponse : any;
  tranResponse : any;
  responseSuccess = ''

  get isAndroid() {
    const platForm =   Capacitor.getPlatform();
    if (platForm === 'android') {
      return true
    }
    return false;
  }

  constructor(
     private ngxXml2jsonService: NgxXml2jsonService,
     public dSIEMVAndroidService: PointlessCCDSIEMVAndroidService,
     ){}

  async ngOnInit() {
    this.resetResponse();// = ''
    this.message = "...waiting for test results."
    this.getMessageResponse();
  }

  async checkBTPermission() {
    const options = {value: 'test'};
    dsiemvandroid.getHasPermission(options)
  }

  async getDeviceInfo() {
    return  await  this.dSIEMVAndroidService.getDeviceInfo;
  }

  async resetResponse() {
    this.tranResponse = null;
    this.cmdResponse  = '';
    this.textResponse = '';
    if (this.processRunning) {
      this.cancelResponse = true;
    }
    const options = {value:''}
    const result  = await dsiemvandroid.setResponse(options);
  }

  async resetbtResponse() {
    this.btTextResponse = '';
    this.btcmdResponse = '';
    if (this.processRunning) {
      this.cancelResponse = true;
    }
    const options = {value:''}
    const result =  await dsiemvandroid.setbtResponse(options);
  }

  async refreshInfo() {
    await this.resetResponse();
    // await this.getDeviceInfo();
    // await this.listBTDevices();
  }

  async connectToBTDevice() {
    await this.resetbtResponse();
    this.processRunning = true;
    const btItem = this.dSIEMVAndroidService.savedSettings;
    if (!btItem.bluetoothDeviceName) {
      this.message = 'No Bluetooth Device is selected';
      return;
    }
    this.message = 'Connecting to device. ' + btItem.bluetoothDeviceName

    try {
      const options = {'value': btItem.bluetoothDeviceName};
      const item = await dsiemvandroid.connectToBT(options);
      await this.checkResponse();
      const message = {'response': '', value: ''};
      let value = await dsiemvandroid.getMessageResponse(message);
      this.messageResponse = value.value;
    } catch (error) {
      console.log('response', error)
    }
  }

  async disConnectToBTDevice() {
    if (this.btDeviceConnected && this.btDeviceSelected) {
      await this.resetResponse();
      const options = {'value': this.btDeviceSelected};
      const item = await dsiemvandroid.disconnectFromBt(options);
      await this.checkbtResponse();
    }
  }

  async dsiEMVReset() {
    try {
      await this.resetResponse();
      this.processRunning = true;
      const item =  await this.dSIEMVAndroidService.dsiEMVReset();
      this.messageResponse = item?.value;
      this.processRunning = false;
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
      const options =  this.dSIEMVAndroidService.savedSettings as any;
      options.merchantID      = options.merchantID;
      options.pinPadIpAddress = options.pinPadIpAddress;
      options.padPort         = options.padPort;
      const item    = await dsiemvandroid.disconnectFromBt(options)
      this.message  = item;
      await this.checkResponse();
    } catch (error) {
      this.message = error;
    }
  }

  async emvParamDownload() {
    try {
      await this.resetResponse();
      const transaction       = this.dSIEMVAndroidService.savedSettings
      this.processRunning     = true;
      const options           = this.dSIEMVAndroidService.savedSettings as any;
      options.BTDevice        = transaction.bluetoothDeviceName
      options.secureDevice    = transaction.secureDevice;
      options.merchantID      = transaction.merchantID;
      options.pinPadIpAddress = transaction.pinPadIpAddress;
      options.padPort         = transaction.padPort;
      const item              = await dsiemvandroid.emvParamDownload(options)
      this.message            = item;
      await this.checkResponse();
    } catch (error) {
      this.message = error;
    }
  }

  async checkResponse_Transaction() {
    var timer = setInterval(
                await this.intervalCheckResponse,
      500);
    if(timer){
        clearInterval(timer)
    }
  }

  async intervalCheckResponse() {
    let responseSuccess = ''
    let request = ''
    request = await this.getRequest();
    this.request = request;
    responseSuccess =  this.responseSuccess;
    const item = await this.getResponse();
    if (item) {
      if (item.value != '' || this.cancelResponse) {
        this.cancelResponse = false;
        this.processRunning = false;
        responseSuccess     = 'complete'
        return true;
      }
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
      if (this.responseSuccess != '') {
        responseSuccess =  this.responseSuccess;
      }
      const item = await this.getResponse();
      console.log('response', item, responseSuccess, this.responseSuccess)
      if (item) {
        if (item.value != '' || this.cancelResponse) {
          this.cancelResponse = false;
          this.processRunning = false;
          this.hideRequest    = true;

          this.messageResponse  = item.value;
          responseSuccess     = 'complete'
          return;
        }
      }
    };
  }

  async getResponse(){
    const options = {'response': '', value: ''};
    const item = await dsiemvandroid.getResponse(options);
    this.messageResponse = item.value;
    if (item.value) {
      if (item.value.substring(0, 5) === '<?xml' || item.value.substring(0, 5) === '<RStr') {
        this.messageResponse = ''
        const parser = new DOMParser();
        item.value =  item?.value.replace('#', '')
        const xml = parser.parseFromString(item.value, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;
        // console.log( 'obj', obj )
        if (item.value.substring(0, 5) === '<?xml' ) {
          this.cmdResponse = (obj?.RStream?.CmdResponse);
          this.textResponse = (obj?.RStream?.CmdResponse?.TextResponse);
          this.tranResponse =  obj?.RStream?.TranResponse as TranResponse;
        }
        if (item.value.substring(0, 5) === '<RStr') {
          this.cmdResponse = (obj?.RStream?.CmdResponse);
          this.textResponse = (obj?.RStream?.CmdResponse?.TextResponse);
          this.tranResponse =  obj?.RStream?.TranResponse as TranResponse;
        }

        if (this.cmdResponse) {
          this.getCmdResponse.emit(this.cmdResponse)
        }
        if (this.tranResponse) {
          this.getTranResponse.emit(this.tranResponse)
        }

        this.cancelResponse  = false;
        this.processRunning  = false;
        return  item ;
      }
    }
    this.transactionResponse = item?.value;
  }

  async getMessageResponse() {
    var timer = setInterval(
      await this.checkMessageResponse,
      500);
    if(timer){
    clearInterval(timer)
    }
  }

  async checkMessageResponse() {
    const options = {'response': '', value: ''};
    let item = await dsiemvandroid.getMessageResponse(options);
    this.messageResponse  = item.value;
  }

  async getRequest() {
    const options = {'response': '', value: ''};
    let item = await dsiemvandroid.getRequest(options);
    if (item && item.value) {
      try {
        if (item.value.substring(0, 5) === '<?xml' || item.value.substring(0, 5) === '<RStr') {

          item.value =  item?.value.replace('#', '')
          item.value =  item?.value.replace('\n', '')

          const parser = new DOMParser();

          const xml = parser.parseFromString(item.value, 'text/xml');
          const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;

          return  obj
        }
      } catch (error) {
        console.log('item', item)
        return   JSON.parse(item.value)
      }

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
        this.messageResponse = ''
        responseSuccess = 'complete'
        this.message = '';
        this.request = '';
        return;
      }
    };
  }

  async getbtResponse(){
    const options = {'response': '', value: ''};
    const item = await dsiemvandroid.getbtResponse(options);
    console.log('getbtResponse 1', item)
    try {
      if (item.value) {
        if (item.value.substring(0, 5) === '<?xml' ||  item.value.substring(0, 5) === '<TStr' || item.value.substring(0, 5) === '<RStr') {
          this.cancelResponse = true;
          const parser = new DOMParser();
          item.value =  item?.value.replace('#', '')
          const xml = parser.parseFromString(item.value, 'text/xml');
          const obj = this.ngxXml2jsonService.xmlToJson(xml) as any;
          // console.log('cmdResponse', obj?.RStream?.CmdResponse)
          // console.log('cmdResponse', obj?.RStream?.CmdResponse.TextResponse)
          this.tranResponse =  this.textResponse = obj?.TranResponse;

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
      this.message = ''
      this.messageResponse = ''
      this.responseSuccess  = 'false'
      this.hideRequest    = false;
      await this.resetResponse();
      this.cancelResponse = true;
      this.processRunning = false;
      const options = { value: ' value.'}
      const item    = await dsiemvandroid.cancelTransaction(options)
      this.message  = ''
      this.request  = ''
      this.tranResponse  = ''
      this.transactionResponse =  '';
    } catch (error) {
      this.message = error;
    }
  }

  async emvSale() {
    try {

      let options  = this.initTransaction();
      console.log('emvSale', options);

      if (!options) {
        options = this.transaction;
      }

      this.processRunning = true;

      await this.resetResponse();

      const item = await dsiemvandroid.processSale(options)

      await  this.checkResponse();

    } catch (error) {
      this.message = error;
    }
  }

  initTransaction(): any {
    const item           = {} as any;
    const value          = this.dSIEMVAndroidService.savedSettings;// as Transaction;
    if (value) {
      item.amount          = value.amount;
      item.pOSPackageID    = value.pOSPackageID
      item.padPort         = value.padPort;
      item.pinPadIpAddress = value.pinPadIpAddress;
      item.merchantID      = value.merchantID;
      item.secureDevice    = value.secureDevice;
      item.tranCode        = value.tranCode;
      item.bluetoothDeviceName  = value.bluetoothDeviceName;
      if (!value.bluetoothDeviceName) {
        item.bluetoothDeviceName  = value.secureDevice;
      }
      return item;
    }
  }


}
