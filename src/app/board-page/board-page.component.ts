import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { BoardHeaderResponseDto, BoardResponseDto, GameResponseDto, PlayControllerService } from '../api/kalah-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {

  public gameResponseDto: GameResponseDto = {};
  public t1: Tile1[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playControllerService: PlayControllerService) {

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

  isButtonDisabled(arg0: Tile1) {
    return arg0.isKalah || arg0.tileCount == 0 || arg0.player != this.gameResponseDto.turn;
  }

  public move(pit: number) {
    console.log('kerem')
    this.playControllerService.makeMove(this.gameResponseDto.id!, pit).subscribe(result => {
      this.gameResponseDto.turn = result.turn; // kerem dikkat degistir
      this.t1.forEach(
        tt => result.boardResponseDtos?.filter(boa => boa.pit === tt.id /*kerem bu map olsun*/).map(boa => tt.tileCount = boa.tokenCount)
      )
    });

  }
}

export interface Tile1 {
  id?: number;
  tileCount?: number;
  rows: number;
  color: string
  player: BoardResponseDto.PlayerSideEnum;
  isKalah: boolean;
}
