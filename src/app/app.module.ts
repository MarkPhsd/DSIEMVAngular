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

@NgModule({
  declarations: [
    AppComponent,
    DsiEMVAndroidComponent,
    CardPointSettingsComponent,
    SafePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule
  ],
  providers:  [
    BluetoothSerial
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
