import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateGameRequestDto, GameControllerService } from '../api/kalah-api';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

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
			playerAName: ['', Validators.required],
      playerBName: ['', Validators.required],
      pitCount: ['', Validators.required]
		});

  }

  createGameRequestDto: CreateGameRequestDto = {playerAName: '', playerBName: '', pitCount: 3, againstComputer: false};


  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  public createNewGame() {
    this.gameControllerService.createGame(this.createGameRequestDto).subscribe(data1 => {this.router.navigateByUrl('/gameplay',{ state: {game: data1}})
      });
  }

}
