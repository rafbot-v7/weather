import { Component, ElementRef, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonContent, IonSegmentView, IonSegmentContent, IonButton, IonIcon, IonFooter, IonImg, IonButtons, IonTabs, IonTabBar, IonTabButton } from "@ionic/angular/standalone";
import { ForecastComponent } from "../forecast/forecast.component";
import { CommonModule } from '@angular/common';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonTabButton, IonTabBar, IonTabs, IonButtons, IonImg, IonFooter,CommonModule, IonIcon, IonButton, IonContent, IonSegmentButton, IonSegment, IonToolbar, IonHeader, IonSegmentView, IonSegmentContent, ForecastComponent],
})
export class ModalComponent  implements OnInit,AfterViewInit {

@Input() list: any[] = [];
showFooter = true;
  constructor(

  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ionViewDidLoad(){
    
  }
 

  ngOnInit() {}
  

 

}
