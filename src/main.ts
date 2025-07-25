import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { airplane, airplaneOutline, waterOutline,speedometerOutline,eyeOutline,thermometerOutline,locationOutline,addOutline, chevronForwardOutline, sunnyOutline,partlySunnyOutline } from 'ionicons/icons';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
addIcons({
  'location-outline': locationOutline,
  'airplane-outline': airplaneOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'sunny-outline': sunnyOutline,
  'partly-sunny-outline':partlySunnyOutline,
  'add-outline':addOutline,
  'thermometer-outline':thermometerOutline,
  'water-outline':waterOutline,
  'eye-outline':eyeOutline,
  'speedometer-outline':speedometerOutline
});