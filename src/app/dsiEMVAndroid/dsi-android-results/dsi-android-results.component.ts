import { Component, Input, OnInit } from '@angular/core';
import { TranResponse } from 'src/app/models/models';

@Component({
  selector: 'pointlesscc-dsi-android-results',
  templateUrl: './dsi-android-results.component.html',
  styleUrls: ['./dsi-android-results.component.scss']
})
export class DsiAndroidResultsComponent implements OnInit {

  @Input() tranResponse: TranResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
