import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { home } from "ionicons/icons";

export const route: Routes = [
    {
        path:'tabs',
        component:TabsPage,
        children:[
            {
                path:'home',
                loadComponent:() => import('src/app/page/home/home.page').then((m)=>m.HomePage)
            }
        ]
    },
      {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
]