import { Component, Input, OnInit } from '@angular/core';
import { IsoToAmPmPipe } from "../../pipes/iso-to-am-pm.pipe";
import { DateToDayPipe } from "../../pipes/date-to-day.pipe";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  imports: [IsoToAmPmPipe, DateToDayPipe],
})
export class ForecastComponent  implements OnInit {
@Input() time:any
@Input() precipitation:any
@Input() temperature:any
@Input() weatherreport:any
  constructor() { }

  ngOnInit() {}

}
