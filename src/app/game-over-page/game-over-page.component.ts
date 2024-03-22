import { Component, Input } from '@angular/core';
import { GameResponseDto } from '../api/kalah-api';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { WinnerPipe } from '../model/winner-pipe';

@Component({
  selector: 'app-game-over-page',
  standalone: true,
  imports: [MatCardModule, CommonModule, WinnerPipe],
  templateUrl: './game-over-page.component.html',
  styleUrl: './game-over-page.component.scss'
})
export class GameOverPageComponent {

  @Input() gameResponseDto: GameResponseDto | undefined;

  public isGameOver(): boolean { // KEREM BU bir ortak metodu olabilir
    return this.gameResponseDto!.status !== GameResponseDto.StatusEnum.Active;
  }

}
