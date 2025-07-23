import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, ModalController, IonFooter, IonButtons, IonImg } from '@ionic/angular/standalone';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IonModal, GestureController, Gesture, AnimationController, GestureDetail } from '@ionic/angular';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonImg, IonButtons, IonFooter, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit, AfterViewInit {
  apphome: any
  modalElement: ElementRef<any> | null = null;
  isModalOpenFull = false;
  showFooter = true;
  weatherData = {
    city: 'Montreal',
    temperature: 19,
    condition: 'Moslty Clear',
    icon: '',
    highest: 24,
    lowest: 18,

  }
  weatherDataList = [
    {
      city: 'Montreal',
      temperature: 19,
      condition: 'Moslty Clear',
      icon: '',
      highest: 24,
      lowest: 18,
    },
    {
      city: 'Toronto',
      temperature: 22,
      condition: 'Sunny',
      icon: '',
      highest: 26,
      lowest: 20,
    },
    {
      city: 'Vancouver',
      temperature: 18,
      condition: 'Rainy',
      icon: '',
      highest: 22,
      lowest: 16,
    },
    {
      city: 'Calgary',
      temperature: 15,
      condition: 'Cloudy',
      icon: '',
      highest: 20,
      lowest: 12,
    },
    {
      city: 'Calgary',
      temperature: 15,
      condition: 'Cloudy',
      icon: '',
      highest: 20,
      lowest: 12,
    },
    {
      city: 'Calgary',
      temperature: 15,
      condition: 'Cloudy',
      icon: '',
      highest: 20,
      lowest: 12,
    },
    {
      city: 'Calgary',
      temperature: 15,
      condition: 'Cloudy',
      icon: '',
      highest: 20,
      lowest: 12,
    },]
  ngOnInit() {
    this.openforecast().then(() => {
      const element = document.querySelector('ion-segment-view');
      console.log(element);
      this.modalElement = element ? new ElementRef(element) : null;
      this.setUpGesture()

    }).catch((error) => {
      console.error('Error opening modal:', error);
    });

  }
  ngAfterViewInit() {


  }

  constructor(
    private modal: ModalController,
    private gesturecontroller: GestureController,
  private animation:AnimationController) { }
  async openforecast() {
    const modal = await this.modal.create({
      component: ModalComponent,
      componentProps: {
        list: this.weatherDataList
      },
      cssClass: "c-modal__weatherlist",
      backdropDismiss: false,
      showBackdrop: true,
      animated: true,
      keyboardClose: true,
      handle: true,
      breakpoints: [0.39, 1],
      initialBreakpoint: 0.39,
      canDismiss: false,
    });
    modal.addEventListener('willPresent', () => {
        const modalElement = document.querySelector('.c-modal__weatherlist');
        if (modalElement) {
          const nonDraggableArea = modalElement.querySelector('.non-draggable');
          if (nonDraggableArea) {
            nonDraggableArea.addEventListener('touchstart', (event) => {
              event.stopPropagation(); // Prevent touch events from triggering drag
            });
          }
        }
      });
    await modal.present();
    modal.addEventListener('ionBreakpointDidChange', (event: CustomEvent) => {
      const breakpoint = event.detail.breakpoint;
      console.log('Breakpoint changed:', breakpoint);
      if (breakpoint === 0.39) {
        this.isModalOpenFull = false;
        // document.querySelector('.c-modal__weatherlist')?.classList.remove('nofilter');
        this.apphome = document.querySelector('app-home') as HTMLElement;
        // this.apphome.classList.remove('app-home__modal-open');
        // const footer = document.getElementsByClassName('c-modal__footer')[0].classList.remove('slide-down');
        // console.log('footr', footer);
      } else {
        // document.getElementsByClassName('c-modal__footer')[0].classList.add('slide-down');
        this.isModalOpenFull = true;
        this.apphome = document.querySelector('app-home') as HTMLElement;
        // this.apphome.classList.add('app-home__modal-open');
        // document.querySelector('.c-modal__weatherlist')?.classList.add('nofilter');

      }
    })
  }
  setUpGesture() {
    const ionpage = document.querySelector('app-home') as HTMLElement;
    const startSize = 90;
    const endSize = 20;
    const startMargin = 88;
    const endMargin = 60;
    const wdStartmargin = 90;
    const wdEndMargin = 10;
    const modalcontainer = document.querySelector('.c-modal__container') as HTMLElement
    const weatherDetails = document.querySelector('.c-modal__weatherdetails') as HTMLElement
    const weatherElemet = document.querySelector('.m-home__weather') as HTMLElement
    const tempcondition = document.querySelector('.m-home__tempcondition') as HTMLElement;
    let temperature = document.querySelector('.m-home__temperature') as HTMLElement;
    const house3d = document.querySelector('.m-home__house3dimg') as HTMLElement
    const gestute = this.gesturecontroller.create({
      el: this.modalElement?.nativeElement,
      gestureName: 'swipe-modal',
      direction: 'y',
      onMove: (detail: GestureDetail) => {
        temperature = document.querySelector('.m-home__temperature') as HTMLElement;
        const deltaY = detail.deltaY;
        requestAnimationFrame(() => {
          const maxDrag = window.innerHeight * 0.1;
          const progress = Math.min(Math.abs(deltaY) / maxDrag, 1);
          const fontSize = startSize - (startSize - endSize) * progress;
          const margin = startMargin - (startMargin - endMargin) * progress;
          const wdmargin = wdStartmargin - (wdStartmargin - wdEndMargin) * progress
          const opacity = 0.2 + 1 * progress;
          if (deltaY <= 0) {
          //  tempcondition.classList.remove('flexcolumn')
          modalcontainer.classList.remove('bottom-border')
           console.log(tempcondition);
           weatherElemet.style.marginTop = `${margin}px`;
           weatherDetails.style.marginTop=`${wdmargin}px`;
            temperature.style.fontSize = `${fontSize}px`;
            // console.log(temperature,'drag  up');
            //  console.log(opacity);
            ionpage.style.background = `linear-gradient(90deg,rgba(34, 24, 61, ${opacity}) 0%, rgba(67, 41, 106,  ${opacity}) 50%, rgba(34, 24, 61,  ${opacity}) 100%),url("assets/images/background.jpg") no-repeat center/cover`;
            house3d.style.opacity = `${0.8 - opacity}`

          }
          else {
            // tempcondition.classList.add('flexcolumn')
            // console.log(fontSize,endSize);
            modalcontainer.classList.add('bottom-border')
            ionpage.style.background = `linear-gradient(90deg,rgba(34, 24, 61, ${1 - opacity}) 0%, rgba(67, 41, 106,  ${1 - opacity}) 50%, rgba(34, 24, 61,  ${1 - opacity}) 100%),url("assets/images/background.jpg") no-repeat center/cover`;
            house3d.style.opacity = `${opacity}`;
            temperature.style.fontSize = `${startSize - fontSize + endSize}px`;
            weatherElemet.style.marginTop = `${startMargin - margin + endMargin}px`
             weatherDetails.style.marginTop=`${wdStartmargin -  wdmargin + wdEndMargin}px`;
            // console.log(temperature,'drag down');
          }
        })
      },
      onEnd: (detail: GestureDetail) => {
        temperature = document.querySelector('.m-home__temperature') as HTMLElement;
        if (!this.isModalOpenFull) {
          
            (temperature as HTMLElement).style.fontSize = `${startSize}px`;
            (ionpage as HTMLElement).style.background = `linear-gradient(90deg,rgba(34, 24, 61, 1) 0%, rgba(67, 41, 106,  1) 50%, rgba(34, 24, 61,  1) 100%),url("assets/images/background.jpg") no-repeat center/cover`;
            house3d.style.opacity='1'
          
        }
        else {
          
            (temperature as HTMLElement).style.fontSize = `${startSize}px`;
            (ionpage as HTMLElement).style.background = `linear-gradient(90deg,rgba(34, 24, 61, 0.2) 0%, rgba(67, 41, 106,  0.2) 50%, rgba(34, 24, 61,  0.2) 100%),url("assets/images/background.jpg") no-repeat center/cover`;
            house3d.style.opacity='0'
          
        }
      }
    })
    gestute.enable()
  }
}