import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { GameControllerService } from '../api/kalah-api';
import { catchError, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resume-game-page',
  standalone: true,
  imports: [MatCardModule, FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './resume-game-page.component.html',
  styleUrl: './resume-game-page.component.scss'
})
export class ResumeGamePageComponent implements OnInit {

  public form?: FormGroup;
  public gameId?: number;

  constructor(private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private gameControllerService: GameControllerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      gameIdForm: [this.gameId, Validators.required]
    });
  }

  resumeGame() {
    this.gameControllerService.getGame(this.gameId!).pipe(
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
