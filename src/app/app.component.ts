import { Component } from '@angular/core';
import { Capacitor} from '@capacitor/core';
import { dsiemvandroid } from 'dsiemvandroid';

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

  constructor(   ){

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
      console.log('this return ', item)
      this.message = item;
    } catch (error) {
      this.message = error;
    }
  }
}
