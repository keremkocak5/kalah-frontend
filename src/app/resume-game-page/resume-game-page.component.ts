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
import { ListGamesPageComponent } from "../list-games-page/list-games-page.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-resume-game-page',
  standalone: true,
  imports: [MatCardModule, FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './resume-game-page.component.html',
  styleUrl: './resume-game-page.component.scss'
})
export class ResumeGamePageComponent {


  form: FormGroup;
  kerem?: number;

  constructor (    private formBuilder: FormBuilder,
    private router: Router,
    private gameControllerService: GameControllerService
  ) {


    this.form = formBuilder.group({
      playerRedName: ['', Validators.required],
      playerBlueName: ['', Validators.required],
      pitCount: ['', Validators.required]
    });
  }

  resumeGame() {
    throw new Error('Method not implemented.');
    }
  

}
