import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { IUser } from 'src/app/interceptors/basic-auth.interceptor';
import { AuthorizationPOST } from 'src/app/models/tripos';
import { TriPOSLaneService } from 'src/app/services/tripPOS/tri-poslane.service';

@Component({
  selector: 'pointlesscc-tri-posdevice-setup',
  templateUrl: './tri-posdevice-setup.component.html',
  styleUrls: ['./tri-posdevice-setup.component.scss']
})
export class TriPOSDeviceSetupComponent implements OnInit {

  inputForm: FormGroup;
  activationCode: string;
  user: IUser
  action$: Observable<any>;
  process: boolean;
  constructor(private fb: FormBuilder,

              private triPOSLaneService : TriPOSLaneService,) { }

  ngOnInit(): void {
    this.user  = this.userSettings;

    this.inputForm = this.fb.group({
      activationCode: [],
      terminalID: ['0001'],
      laneId: ['1'],
    })
  }

  get userSettings() {
    const userString = localStorage.getItem('user')
    return JSON.parse(userString)
  }

  activateDevice() {
    const item = this.inputForm.value as AuthorizationPOST;
    this.process = true;
    this.action$ = this.triPOSLaneService.createLane(this.user.apiURL, item).pipe(switchMap(data => {
      this.process = false
      return of(data)
    }))
  }

  listLanes() {
    const item = this.inputForm.value as AuthorizationPOST;
    this.process = true;
    this.action$ = this.triPOSLaneService.getLanes(this.user.apiURL).pipe(switchMap(data => {
      this.process = false
      return of(data)
    }))
  }
}
// {

//   "laneId": "4",

//   "description": "triPOS Cloud Lane",

//   "terminalId": "0001",

//   "activationCode": "C000000",

//   "marketCode": "7"

// }
