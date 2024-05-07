import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dsievmAndroid', pathMatch: 'full' },

  { path: 'settings',   component: UserSettingsComponent,   data: { animation: 'isLeft'} },
  { path: 'dsievmAndroid',   component: DsiEMVAndroidComponent,   data: { animation: 'isLeft'} },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

