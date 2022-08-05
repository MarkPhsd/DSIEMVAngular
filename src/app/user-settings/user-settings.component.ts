import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../interceptors/basic-auth.interceptor';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  inputForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit()  {
    this.initForm();
  }

  get user() : IUser{
    const userString = localStorage.getItem('user')
    return JSON.parse(userString)
  }

  setuser() {
    this.inputForm.valueChanges.subscribe(data =>{
      const userString = JSON.stringify(data);
      localStorage.setItem('user', userString)
    });
  }

  initForm() {
    this.inputForm = this.fb.group({
      id: [],
      userName:  [],
      password:  [],
      firstName:  [],
      lastName:  [],
      authdata:  [],
      resetCode:  [],
      email:  [],
      sourceURL:  [],
      token:  [],
      phone: [],
      roles:  [],
      type:   [],
      employeeID:  [],
      metrcUser: [],
      metrcKey:  [],
      loginAttempts:  [],
      message:  [],
      errorMessage:  [],
      apiURL  :  [],
    })
    this.inputForm.patchValue(this.user)
    this.setuser();
  }

}
