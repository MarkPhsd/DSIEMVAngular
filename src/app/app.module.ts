import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SafePipe } from './safe-pipe.pipe';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { CardPointSettingsComponent } from './cardPointe/card-point-settings/card-point-settings.component';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';
import { CpVIVO3300Component } from './cardPointe/cp-vivo3300/cp-vivo3300.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardpointeTransactionsComponent } from './cardPointe/cardpointe-transactions/cardpointe-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    CardPointSettingsComponent,
    DsiEMVAndroidComponent,
    CardpointeTransactionsComponent,
    CpVIVO3300Component,
    UserSettingsComponent,
    SafePipe
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    MaterialModule
  ],
  providers:  [
    { provide: HTTP_INTERCEPTORS,  useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS,  useClass: ErrorInterceptor, multi: true },
    BluetoothSerial
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
