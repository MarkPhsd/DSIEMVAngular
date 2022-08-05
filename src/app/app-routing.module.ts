import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPointSettingsComponent } from './cardPointe/card-point-settings/card-point-settings.component';
import { CardpointeTransactionsComponent } from './cardPointe/cardpointe-transactions/cardpointe-transactions.component';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: 'settings',   component: UserSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'dsievmAndroid',   component: DsiEMVAndroidComponent,   data: { animation: 'isLeft'} },
  { path: 'cardPointSetings', component: CardPointSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'cardpointtransactions', component: CardpointeTransactionsComponent,   data: { animation: 'isLeft'} },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

