import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BoardPageComponent } from './board-page/board-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'gameplay', component: BoardPageComponent }
];
