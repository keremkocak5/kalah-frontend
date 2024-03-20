import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateGameRequestDto, GameControllerService } from '../api/kalah-api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { catchError, take, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-game-page',
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatCardModule, FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-game-page.component.html',
  styleUrl: './new-game-page.component.scss'
})
export class NewGamePageComponent implements OnInit {

  public form?: FormGroup;
  public createGameRequestDto: CreateGameRequestDto = { playerBlueName: '', playerRedName: '', pitCount: 6 };

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private gameControllerService: GameControllerService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      playerRedName: ['', Validators.required],
      playerBlueName: ['', Validators.required],
      pitCount: ['', [Validators.required]]
    });
  }

  public createNewGame() {
    this.gameControllerService.createGame(this.createGameRequestDto).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackBar.open(err.error.detail, 'Ok', {
          duration: 3000
        });
        return throwError(() => err);
      }),
      take(1)).subscribe(gamedata => {
        this.router.navigateByUrl('/gameplay', { state: { game: gamedata } })
      });
  };

}
