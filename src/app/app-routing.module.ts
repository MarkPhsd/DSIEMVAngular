import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPointIDTECHAndroidComponent } from './cardPointe/card-point-idtechandroid/card-point-idtechandroid.component';
import { CardPointSettingsComponent } from './cardPointe/card-point-settings/card-point-settings.component';
import { CardpointeTransactionsComponent } from './cardPointe/cardpointe-transactions/cardpointe-transactions.component';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';
import { PaypalComponent } from './paypal/paypal.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dsievmAndroid', pathMatch: 'full' },

  { path: 'settings',   component: UserSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'dsievmAndroid',   component: DsiEMVAndroidComponent,   data: { animation: 'isLeft'} },
  { path: 'cardPointSetings', component: CardPointSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'cardPointAndroid', component: CardPointIDTECHAndroidComponent,   data: { animation: 'isLeft'} },
  { path: 'cardpointtransactions', component: CardpointeTransactionsComponent,   data: { animation: 'isLeft'} },
  { path: 'paypal', component: PaypalComponent,   data: { animation: 'isLeft'} },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

