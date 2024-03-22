import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { BoardHeaderResponseDto, BoardResponseDto, GameResponseDto, PlayControllerService } from '../api/kalah-api';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { PlayerCardComponent } from "../player-card-page/player-card-page.component";
import { BoardTile } from '../model/board-tile';
import { GameOverPageComponent } from "../game-over-page/game-over-page.component";

@Component({
    selector: 'app-board-page',
    standalone: true,
    templateUrl: './board-page.component.html',
    styleUrl: './board-page.component.scss',
    imports: [MatIconModule, FlexLayoutModule, MatCardModule, MatGridListModule, CommonModule, PlayerCardComponent, GameOverPageComponent]
})
export class BoardPageComponent implements OnInit {

/*
refactor
pembe renk gelsin
winner case (get game icin de)
animasyon
renkleri csse ver
*/


  public gameResponseDto: GameResponseDto = {};
  public t1: BoardTile[] = [];
  public turn1: GameResponseDto.TurnEnum | undefined;
  public gameStatus: GameResponseDto.StatusEnum | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playControllerService: PlayControllerService) {

  }

  public isPlayersTurn(turn: GameResponseDto.TurnEnum): boolean {
      return this.gameResponseDto.turn === turn;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(take(1), map(() => window.history.state)).subscribe(data => {
        if (data.navigationId == '1') {
          this.router.navigateByUrl('/');
        }
        this.gameResponseDto = data.game;
        this.createTiles();
      },
        error => console.log('kerem'));
  }

  private createTiles() {
    this.gameResponseDto.boardResponseDtos?.sort((n1: BoardResponseDto, n2: BoardResponseDto) =>
      n1.playerSide!.localeCompare(n2.playerSide!) || Number(n2.isKalah) - Number(n1.isKalah) || n2.playerSide === BoardResponseDto.PlayerSideEnum.Red ? n2.id! - n1.id! : n1.id! - n2.id!)
      .forEach(boardResponseDto => {
        this.t1.push({ id: boardResponseDto.pit, tileCount: boardResponseDto.tokenCount, rows: boardResponseDto.isKalah ? 2 : 1, color: boardResponseDto.playerSide === BoardResponseDto.PlayerSideEnum.Blue ? 'blue' : 'red', player: boardResponseDto.playerSide! , isKalah : boardResponseDto.isKalah! })
      });
  }

  isMoveButtonDisabled(arg0: BoardTile) {
    return this.isGameOver() || arg0.isKalah || arg0.tileCount == 0 || arg0.player != this.gameResponseDto.turn;
  }
  public isGameOver(): boolean {
    return this.gameResponseDto.status !== GameResponseDto.StatusEnum.Active;
  }

  public move(pit: number) {
    this.playControllerService.makeMove(this.gameResponseDto.id!, pit).subscribe(result => {
      this.gameResponseDto.turn = result.turn; // kerem dikkat degistir
      this.gameResponseDto.status = result.gameStatus;
      this.t1.forEach(
        tt => result.boardResponseDtos?.filter(boa => boa.pit === tt.id /*kerem bu map olsun*/).map(boa => tt.tileCount = boa.tokenCount)
      )
    });
  }
}

