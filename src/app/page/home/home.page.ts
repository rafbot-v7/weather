import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, ModalController, IonFooter, IonButtons, IonImg } from '@ionic/angular/standalone';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IonModal, GestureController, Gesture, AnimationController, GestureDetail } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Preferences } from '@capacitor/preferences';
import { key } from 'ionicons/icons';
interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  highest: number;
  lowest: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonImg, IonButtons, IonFooter, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('modalElement', { static: false }) modalElementRef?: ElementRef<HTMLElement>;
  private modalTabs?: HTMLElement;
  isModalOpenFull = false;
  showFooter = true;
  private readonly WEATHERDATA = 'weatherdata'
  private readonly CONFIG = {
    INITIAL_BREAKPOINT: 0.45,
    BREAKPOINTS: [0.45, 1],
    MAX_DRAG: window.innerHeight * 0.1,
    STYLES: {
      FONT: { START_SIZE: 90, END_SIZE: 20 },
      MARGIN: { START: 88, END: 60 },
      WEATHER_MARGIN: { START: 90, END: 10 },
      OPACITY: { MIN: 0.2, MAX: 1, HOUSE_MAX: 0.8 },
    },
    SELECTORS: {
      MODAL: '.c-modal__weatherlist',
      MODAL_CONTAINER: '.c-modal__container',
      MODAL_TABS: '.c-modal__tabs',
      WEATHER_CONTAINER: '.c-modal__weathercontainer',
      WEATHER_DETAILS: '.c-modal__weatherdetails',
      WEATHER: '.m-home__weather',
      TEMPERATURE: '.m-home__temperature',
      HOUSE_3D: '.m-home__house3dimg',
      APP_HOME: 'app-home',
      SEGMENT_VIEW: 'ion-segment-view'
    },
    BACKGROUND: (opacity: number) =>
      `linear-gradient(90deg, rgba(34, 24, 61, ${opacity}) 0%, rgba(67, 41, 106, ${opacity}) 50%, rgba(34, 24, 61, ${opacity}) 100%), url("assets/images/background.jpg") no-repeat center/cover`,
  };
  weatherData: WeatherData = {
    city: 'Montreal',
    temperature: 19,
    condition: 'Mostly Clear',
    icon: '',
    highest: 24,
    lowest: 18,
  };
  data: any
  weatherDataList: WeatherData[] = [
    { city: 'Montreal', temperature: 19, condition: 'Mostly Clear', icon: '', highest: 24, lowest: 18 },
    { city: 'Toronto', temperature: 22, condition: 'Sunny', icon: '', highest: 26, lowest: 20 },
    { city: 'Vancouver', temperature: 18, condition: 'Rainy', icon: '', highest: 22, lowest: 16 },
    { city: 'Calgary', temperature: 15, condition: 'Cloudy', icon: '', highest: 20, lowest: 12 },
    { city: 'Calgary', temperature: 15, condition: 'Cloudy', icon: '', highest: 20, lowest: 12 },
    { city: 'Calgary', temperature: 12, condition: 'Cloudy', icon: '', highest: 20, lowest: 12 },
    { city: 'Vancouver', temperature: 15, condition: 'Cloudy', icon: '', highest: 20, lowest: 12 },
    { city: 'Calgary', temperature: 20, condition: 'Sunny', icon: '', highest: 20, lowest: 12 },
  ];

  constructor(
    private modalCtrl: ModalController,
    private gestureCtrl: GestureController,
    private animationCtrl: AnimationController,
    private api: ApiService
  ) { }

  async ngOnInit() {
    this.openForecast().then(() => {
      this.initializeModalElements();
      this.setupGesture();
    }).catch((error) => {
      console.error('Error opening modal:', error);
    });
    this.loadData()
  }

  ngAfterViewInit() {
  }
  async loadData() {
    const storedWeather = await Preferences.get({ key: this.WEATHERDATA });
    console.log(storedWeather);
    if (storedWeather.value != undefined || storedWeather.value!=null) {
      this.data = JSON.parse(storedWeather.value)
      console.log(this.data, 'drtfyugu');
    } else {
      this.api.getData('forecast?latitude=22&longitude=79&hourly=temperature_2m,precipitation,precipitation_probability,rain,showers,wind_speed_10m,wind_direction_10m&timezone=auto&start_date=2025-07-27&end_date=2025-08-05').subscribe(
        {
          next: async (data) => {
            this.data = data;
            await Preferences.set({ key: this.WEATHERDATA, value: JSON.stringify(this.data) });
            this.data = (await Preferences.get({ key: this.WEATHERDATA })).value;
            console.log(this.data,'efwvfcqdwx');
          },
          error: (err) => {
            console.log(err);
          },
        }
      );
    }

  }
  private async openForecast() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { list: this.weatherDataList },
      cssClass: this.CONFIG.SELECTORS.MODAL.slice(1),
      backdropDismiss: false,
      showBackdrop: true,
      animated: true,
      keyboardClose: true,
      handle: true,
      breakpoints: this.CONFIG.BREAKPOINTS,
      initialBreakpoint: this.CONFIG.INITIAL_BREAKPOINT,
      canDismiss: false,
    });
    modal.addEventListener('willPresent', () => {
      const modalElement = document.querySelector(this.CONFIG.SELECTORS.MODAL);
      if (modalElement) {
        const nonDraggableArea = modalElement.querySelector('.non-draggable');
        if (nonDraggableArea) {
          nonDraggableArea.addEventListener('touchstart', (event) => {
            event.stopPropagation();
          });
        }
      }
    });

    modal.addEventListener('ionBreakpointDidChange', (event: CustomEvent) => {
      const breakpoint = event.detail.breakpoint;
      this.isModalOpenFull = breakpoint !== this.CONFIG.INITIAL_BREAKPOINT;
      if (this.modalTabs) {
        this.modalTabs.style.opacity = this.isModalOpenFull ? '0' : '1';
      }
    });

    await modal.present();
  }

  private initializeModalElements() {
    this.modalTabs = document.querySelector(this.CONFIG.SELECTORS.MODAL_TABS) as HTMLElement;
    const modalElement = document.querySelector(this.CONFIG.SELECTORS.SEGMENT_VIEW) as HTMLElement;
    if (modalElement) {
      this.modalElementRef = new ElementRef(modalElement);
    }
  }

  private setupGesture() {
    if (!this.modalElementRef?.nativeElement) return;

    const elements = {
      ionPage: document.querySelector(this.CONFIG.SELECTORS.APP_HOME) as HTMLElement,
      modalContainer: document.querySelector(this.CONFIG.SELECTORS.MODAL_CONTAINER) as HTMLElement,
      weatherContainers: document.querySelectorAll(this.CONFIG.SELECTORS.WEATHER_CONTAINER) as NodeListOf<HTMLElement>,
      weatherDetails: document.querySelector(this.CONFIG.SELECTORS.WEATHER_DETAILS) as HTMLElement,
      weather: document.querySelector(this.CONFIG.SELECTORS.WEATHER) as HTMLElement,
      temperature: document.querySelector(this.CONFIG.SELECTORS.TEMPERATURE) as HTMLElement,
      house3d: document.querySelector(this.CONFIG.SELECTORS.HOUSE_3D) as HTMLElement,
    };

    const gesture = this.gestureCtrl.create({
      el: this.modalElementRef.nativeElement,
      gestureName: 'swipe-modal',
      direction: 'y',
      onMove: (detail: GestureDetail) => this.handleGestureMove(detail, elements),
      onEnd: (detail: GestureDetail) => this.handleGestureEnd(elements),
    });

    gesture.enable();
  }

  private handleGestureMove(detail: GestureDetail, elements: any) {
    const { deltaY } = detail;
    const progress = Math.min(Math.abs(deltaY) / this.CONFIG.MAX_DRAG, 1);
    const fontSize = this.interpolate(this.CONFIG.STYLES.FONT.START_SIZE, this.CONFIG.STYLES.FONT.END_SIZE, progress);
    const margin = this.interpolate(this.CONFIG.STYLES.MARGIN.START, this.CONFIG.STYLES.MARGIN.END, progress);
    const wdMargin = this.interpolate(this.CONFIG.STYLES.WEATHER_MARGIN.START, this.CONFIG.STYLES.WEATHER_MARGIN.END, progress);
    const opacity = this.interpolate(this.CONFIG.STYLES.OPACITY.MIN, this.CONFIG.STYLES.OPACITY.MAX, progress);

    requestAnimationFrame(() => {
      if (deltaY <= 0) {
        this.applyStylesOnSwipeUp(elements, fontSize, margin, wdMargin, opacity);
      } else {
        this.applyStylesOnSwipeDown(elements, fontSize, margin, wdMargin, opacity);
      }
    });
  }

  private applyStylesOnSwipeUp(elements: any, fontSize: number, margin: number, wdMargin: number, opacity: number) {
    if (this.modalTabs) this.modalTabs.style.opacity = '0';
    elements.modalContainer.classList.remove('bottom-border');
    elements.weather.style.marginTop = `${margin}px`;
    elements.weatherDetails.style.marginTop = `${wdMargin}px`;
    elements.temperature.style.fontSize = `${fontSize}px`;
    elements.ionPage.style.background = this.CONFIG.BACKGROUND(opacity);
    elements.house3d.style.opacity = `${this.CONFIG.STYLES.OPACITY.HOUSE_MAX - opacity}`;
    elements.weatherContainers.forEach((item: HTMLElement) => {
      item.style.opacity = `${opacity}`;
    });
  }

  private applyStylesOnSwipeDown(elements: any, fontSize: number, margin: number, wdMargin: number, opacity: number) {
    elements.modalContainer.classList.add('bottom-border');
    elements.weatherContainers.forEach((item: HTMLElement) => {
      item.style.opacity = `${this.CONFIG.STYLES.OPACITY.HOUSE_MAX - opacity}`;
    });
    elements.ionPage.style.background = this.CONFIG.BACKGROUND(1 - opacity);
    elements.house3d.style.opacity = `${opacity}`;
    elements.temperature.style.fontSize = `${this.CONFIG.STYLES.FONT.START_SIZE - fontSize + this.CONFIG.STYLES.FONT.END_SIZE}px`;
    elements.weather.style.marginTop = `${this.CONFIG.STYLES.MARGIN.START - margin + this.CONFIG.STYLES.MARGIN.END}px`;
    elements.weatherDetails.style.marginTop = `${this.CONFIG.STYLES.WEATHER_MARGIN.START - wdMargin + this.CONFIG.STYLES.WEATHER_MARGIN.END}px`;
  }

  private handleGestureEnd(elements: any) {
    elements.temperature.style.fontSize = `${this.CONFIG.STYLES.FONT.START_SIZE}px`;
    elements.ionPage.style.background = this.CONFIG.BACKGROUND(this.isModalOpenFull ? this.CONFIG.STYLES.OPACITY.MIN : this.CONFIG.STYLES.OPACITY.MAX);
    elements.house3d.style.opacity = this.isModalOpenFull ? '0' : '1';
  }

  private interpolate(start: number, end: number, progress: number): number {
    return start - (start - end) * progress;
  }
}