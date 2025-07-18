import { CommonModule } from '@angular/common';
import { AfterViewInit, Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,ModalController, IonFooter, IonButtons, IonImg } from '@ionic/angular/standalone';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IonModal, GestureController, AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonImg, IonButtons, IonFooter, CommonModule,IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit{

modalElement!: ElementRef;
private gesture: any;
  private footer!: HTMLElement;
  showFooter = true;
  weatherData={
    city:'Montreal',
    temperature:19,
    condition:'Moslty Clear',
    icon:'',
    highest:24,
    lowest:18,

  }
  weatherDataList=[
    {
      city:'Montreal',
      temperature:19,
      condition:'Moslty Clear',
      icon:'',
      highest:24,
      lowest:18,
    },
    {
      city:'Toronto',
      temperature:22,
      condition:'Sunny',
      icon:'',
      highest:26,
      lowest:20,
    },
    {
      city:'Vancouver',
      temperature:18,
      condition:'Rainy',
      icon:'',
      highest:22,
      lowest:16,
    },
    {
      city:'Calgary',
      temperature:15,
      condition:'Cloudy',
      icon:'',
      highest:20,
      lowest:12,
    },
      {
      city:'Calgary',
      temperature:15,
      condition:'Cloudy',
      icon:'',
      highest:20,
      lowest:12,
    },
      {
      city:'Calgary',
      temperature:15,
      condition:'Cloudy',
      icon:'',
      highest:20,
      lowest:12,
    },
      {
      city:'Calgary',
      temperature:15,
      condition:'Cloudy',
      icon:'',
      highest:20,
      lowest:12,
    },]
   
   
  ngOnInit() {
this.openforecast().then(() => {
  const handle = document.getElementsByClassName('c-modal__weatherlist')[0].shadowRoot?.querySelector('.modal__handle');
console.log(handle);
  console.log('Modal opened');
}).catch((error) => {
  console.error('Error opening modal:', error);
});
const handle = document.querySelector('.modal__handle');
console.log(handle);

  }
  constructor(
 
    private modal:ModalController) {}
  async openforecast(){
     const modal = await this.modal.create({
      component:ModalComponent,
      componentProps: {
        list: this.weatherDataList
      },
      cssClass:"c-modal__weatherlist",
      backdropDismiss: false,
      showBackdrop: true,
      animated: true,
      keyboardClose: true,
      handle: true,
      breakpoints: [0.39,0.5, 0.9],
      initialBreakpoint: 0.39,
      canDismiss:false
    });
  await modal.present(); 
   modal.addEventListener('ionBreakpointDidChange', (event: CustomEvent) => {
      const breakpoint = event.detail.breakpoint;
      console.log('Breakpoint changed:', breakpoint);
      if (breakpoint === 0.39) {
       const footer= document.getElementsByClassName('c-modal__footer')
       console.log('footr',footer);
       
      } else {
        document.getElementsByClassName('c-modal__footer')[0].classList.add('slide-down');
       
      }
    });
  
    
    
  }
 
}
