import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PointlessCCPanelComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SafePipe } from './safe-pipe.pipe';
import { CardPointSettingsComponent } from './cardPointe/card-point-settings/card-point-settings.component';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';
import { CpVIVO3300Component } from './cardPointe/cp-vivo3300/cp-vivo3300.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardpointeTransactionsComponent } from './cardPointe/cardpointe-transactions/cardpointe-transactions.component';
import { CardPointIDTECHAndroidComponent } from './cardPointe/card-point-idtechandroid/card-point-idtechandroid.component';
import { DSIAndroidSettingsComponent } from './dsiEMVAndroid/dsiandroid-settings/dsiandroid-settings.component';
import { DsiAndroidResultsComponent } from './dsiEMVAndroid/dsi-android-results/dsi-android-results.component';
import { PaypalComponent } from './paypal/paypal.component';
import { ValueFieldsComponent } from './shared/value-fields/value-fields.component';

// export { PointlessCCDSIEMVAndroidService } from './services/dsiemvandroid.service';
// export { PointlessCCDsiAngularService } from './services/dsi-angular.service';
// export { DeviceInfoService} from './services/device-info.service';
// export { CardPointService} from './services/card-point.service';
// export { CardPointMethodsService} from  './services/card-point-methods.service';
// export { CardPointBoltService} from  './services/card-point-bolt.service';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PointlessCCPanelComponent,
    CardPointSettingsComponent,
    CardPointIDTECHAndroidComponent,
    CardpointeTransactionsComponent,
    CpVIVO3300Component,
    DsiEMVAndroidComponent,
    DSIAndroidSettingsComponent,
    DsiAndroidResultsComponent,
    UserSettingsComponent,
    PaypalComponent,
    SafePipe,
    ValueFieldsComponent,
  ],
  exports: [
    PointlessCCPanelComponent,
    CardPointSettingsComponent,
    CardPointIDTECHAndroidComponent,
    CardpointeTransactionsComponent,
    CpVIVO3300Component,
    DsiEMVAndroidComponent,
    DSIAndroidSettingsComponent,
    DsiAndroidResultsComponent,
    UserSettingsComponent,
    PaypalComponent,
    ValueFieldsComponent,
  ],

  providers:  [
    { provide: HTTP_INTERCEPTORS,  useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS,  useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [PointlessCCPanelComponent],
  entryComponents: [
    PointlessCCPanelComponent,
    // CardPointSettingsComponent,
    // CardPointIDTECHAndroidComponent,
    // CardpointeTransactionsComponent,
    // CpVIVO3300Component,
    // DsiEMVAndroidComponent,
    // DSIAndroidSettingsComponent,
    // DsiAndroidResultsComponent,
    // DsiAndroidResultsComponent,
   ]
})
export class PaymentProcessingModule { }


