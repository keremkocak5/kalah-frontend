import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateGameRequestDto, GameControllerService } from '../api/kalah-api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { take } from 'rxjs';
import { NewGamePageComponent } from "../new-game-page/new-game-page.component";
import { ResumeGamePageComponent } from "../resume-game-page/resume-game-page.component";
import { ListGamesPageComponent } from "../list-games-page/list-games-page.component";
import {MatToolbarModule} from '@angular/material/toolbar';
  
@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    imports: [MatToolbarModule, MatButtonModule, MatInputModule, FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule, NewGamePageComponent, ResumeGamePageComponent, ListGamesPageComponent]
})
export class LandingPageComponent {


}
