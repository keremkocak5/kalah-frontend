import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateGameRequestDto, GameControllerService } from '../api/kalah-api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-game-page',
  standalone: true,
  imports: [MatCardModule, FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-game-page.component.html',
  styleUrl: './new-game-page.component.scss'
})
export class NewGamePageComponent {


  // kerem number of pits 10 olabilir

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameControllerService: GameControllerService
  ) {


    this.form = formBuilder.group({
      playerRedName: ['', Validators.required],
      playerBlueName: ['', Validators.required],
      pitCount: ['', [Validators.required]]
    });

  }

  createGameRequestDto: CreateGameRequestDto = { playerBlueName: '', playerRedName: '', pitCount: 6 };


  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  public createNewGame() {
    this.gameControllerService.createGame(this.createGameRequestDto).pipe(take(1)).subscribe(data1 => {
      this.router.navigateByUrl('/gameplay', { state: { game: data1 } }), console.error("kerem");
      
    });
  }
  
}
