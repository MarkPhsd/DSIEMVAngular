import { Component } from '@angular/core';
import { Capacitor} from '@capacitor/core';
import { dsiemvandroid } from 'dsiemvandroid';

// https://capacitorjs.com/docs/v2/plugins/android
// https://stackoverflow.com/questions/53065255/how-can-i-access-application-in-mainactivity-which-we-get-in-ionic-projects
// https://developer.android.com/guide/components/intents-common
// https://stackoverflow.com/questions/5944987/how-to-create-a-popup-window-popupwindow-in-android

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DSIEMVAngular';
  message : any

  get isAndroid() {
    const platForm =   Capacitor.getPlatform();
    if (platForm === 'android') {
      return true
    }
    return false;
  }

  constructor(   ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.message = "...waiting for test results."
  }

  async dsiEMVTest() {
    try {
      const options = { value: ' value.'}
      const item = await dsiemvandroid.echo(options)
      this.message = item?.value;
    } catch (error) {
      this.message = error;
    }
  }

  async presentUI() {
    try {
      const options = { value: ' value.'}
      const item = await dsiemvandroid.presentUI(options)
      this.message = item?.value;
    } catch (error) {
      this.message = error;
    }
  }
}
