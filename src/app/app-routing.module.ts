import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPointIDTECHAndroidComponent } from './cardPointe/card-point-idtechandroid/card-point-idtechandroid.component';
import { CardPointSettingsComponent } from './cardPointe/card-point-settings/card-point-settings.component';
import { CardpointeTransactionsComponent } from './cardPointe/cardpointe-transactions/cardpointe-transactions.component';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';
import { PaypalComponent } from './paypal/paypal.component';
import { TriPOSLaneService } from './services/tripPOS/tri-poslane.service';
import { TriPOSDeviceSetupComponent } from './triPOS/tri-posdevice-setup/tri-posdevice-setup.component';
import { TriPOSSettingsComponent } from './triPOS/tri-possettings/tri-possettings.component';
import { TriPOSTransactionsComponent } from './triPOS/tri-postransactions/tri-postransactions.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dsievmAndroid', pathMatch: 'full' },

  { path: 'settings',   component: UserSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'dsievmAndroid',   component: DsiEMVAndroidComponent,   data: { animation: 'isLeft'} },
  { path: 'cardPointSetings', component: CardPointSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'cardPointAndroid', component: CardPointIDTECHAndroidComponent,   data: { animation: 'isLeft'} },
  { path: 'cardpointtransactions', component: CardpointeTransactionsComponent,   data: { animation: 'isLeft'} },


  { path: 'tripos-setup', component: TriPOSDeviceSetupComponent,   data: { animation: 'isLeft'} },
  { path: 'tripos-settings', component: TriPOSSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'tripos-transactions', component: TriPOSTransactionsComponent,   data: { animation: 'isLeft'} },

  { path: 'paypal', component: PaypalComponent,   data: { animation: 'isLeft'} },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

