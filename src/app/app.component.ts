import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonButtons, IonImg } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonImg, IonButtons,IonToolbar, IonFooter, IonApp, IonRouterOutlet],
  providers:[HttpClientModule]
})
export class AppComponent {
  constructor() {}
}
