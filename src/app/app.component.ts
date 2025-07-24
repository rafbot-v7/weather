import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonButtons, IonImg } from '@ionic/angular/standalone';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonImg, IonButtons,IonToolbar, IonFooter, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
