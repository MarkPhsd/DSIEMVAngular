import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardPointSettingsComponent } from './cardPointe/card-point-settings/card-point-settings.component';
import { CardpointeTransactionsComponent } from './cardPointe/cardpointe-transactions/cardpointe-transactions.component';
import { DsiEMVAndroidComponent } from './dsiEMVAndroid/dsi-emvandroid/dsi-emvandroid.component';

const routes: Routes = [
  // {path: '', component: AppComponent,
  //   children: [
      { path: 'dsievmAndroid',   component: DsiEMVAndroidComponent,   data: { animation: 'isLeft'} },
      { path: 'cardPointSetings', component: CardPointSettingsComponent,   data: { animation: 'isLeft'} },
      { path: 'cardpointtransactions', component: CardpointeTransactionsComponent,   data: { animation: 'isLeft'} },
    // ]
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// @NgModule({
//   imports:[
//     // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//     RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })
//     // RouterModule.forRoot(routes, { enableTracing: true })
//   ],
//   // imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   providers: [
//     {
//       provide: CustomReuseStrategy,
//       useClass: CustomReuseStrategy
//     }],
// })
// export class AppRoutingModule { }
