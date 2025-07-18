import { Component, ElementRef, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonContent, IonSegmentView, IonSegmentContent, IonButton, IonIcon, IonFooter, IonImg, IonButtons } from "@ionic/angular/standalone";
import { ForecastComponent } from "../forecast/forecast.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonButtons, IonImg, IonFooter,CommonModule, IonIcon, IonButton, IonContent, IonSegmentButton, IonSegment, IonToolbar, IonHeader, IonSegmentView, IonSegmentContent, ForecastComponent],
})
export class ModalComponent  implements OnInit {

@Input() list: any[] = [];
showFooter = true;
  constructor(

  ) {}
 

  ngOnInit() {}
  

 

}
