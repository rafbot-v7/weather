import { Component, ElementRef, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonContent, IonSegmentView, IonSegmentContent, IonButton, IonIcon, IonFooter, IonImg, IonButtons, IonTabs, IonTabBar, IonTabButton } from "@ionic/angular/standalone";
import { ForecastComponent } from "../forecast/forecast.component";
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import Bellcurve from 'highcharts/modules/histogram-bellcurve';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonTabButton, IonTabBar, IonTabs , IonButtons, IonImg, IonFooter,CommonModule, IonIcon, IonButton, IonContent, IonSegmentButton, IonSegment, IonToolbar, IonHeader, IonSegmentView, IonSegmentContent, ForecastComponent],
})
export class ModalComponent  implements OnInit,AfterViewInit {
Highcharts: typeof Highcharts = Highcharts;
@Input() list: any[] = [];
showFooter = true;
  constructor(

  ) {}
  chartOptions: Highcharts.Options = {
    title: { text: 'Bell Curve Chart' },
    xAxis: { title: { text: 'Value' }, min: -2, max: 8, tickInterval: 1 },
    yAxis: { title: { text: 'Frequency' } },
    series: [
      {
        type: 'histogram',
        baseSeries: 's1',
        zIndex: -1,
        binsNumber: 10,
        color: 'transparent',
        borderWidth: 2,
        borderColor: '#0077FF',
      },
      {
        type: 'scatter',
        data: [2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.7, 4.0, 4.2, 4.5, 4.7, 5.0, 5.2],
        id: 's1',
        visible: false,
        showInLegend: false,
      },
    ],
  };
  ngAfterViewInit() {
    
  }
  ionViewDidLoad(){
    
  }
 

  ngOnInit() {}
  

 

}
