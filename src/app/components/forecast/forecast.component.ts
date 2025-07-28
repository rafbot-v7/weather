import { Component, OnInit } from '@angular/core';
import { IsoToAmPmPipe } from "../../pipes/iso-to-am-pm.pipe";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  imports: [IsoToAmPmPipe],
})
export class ForecastComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
