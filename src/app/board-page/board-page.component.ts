import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { BoardHeaderResponseDto, BoardResponseDto, GameResponseDto } from '../api/kalah-api';
import { CommonModule } from '@angular/common';
import { GameplayControllerService } from '../api/kalah-api';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {

isButtonDisabled(arg0: Tile1) {
 return arg0.tileCount==0 || arg0.player==this.gameResponseDto.turn;
}
 

  public gameResponseDto: GameResponseDto ={};
  public board: BoardHeaderResponseDto = {};
  public t1: Tile1[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private gameplayControllerService: GameplayControllerService){
    
  }
  

  ngOnInit(): void {
     this.activatedRoute.paramMap
      .pipe(take(1), map(() => window.history.state)).subscribe(data => { 
        if(data.navigationId == '1') {
          this.router.navigateByUrl('/');
        }
        this.gameResponseDto = data.game;
        this.gameplayControllerService.getBoard(data.game.id).pipe(take(1)).subscribe(board => {
          this.board = board; 
          this.createTiles()} );
      }, 
        error => console.log('kerem'));
  }

  private createTiles() {
    //console.log('>', this.board);

     this.board.boardResponseDtos?.sort((n1: BoardResponseDto, n2: BoardResponseDto) => 
       n1.playerSide!.localeCompare(n2.playerSide!) ||  Number(n2.kalah)-Number(n1.kalah)|| n2.playerSide===BoardResponseDto.PlayerSideEnum.Red ?  n2.id!-n1.id! : n1.id!-n2.id! )
     .forEach(boardResponseDto =>  {
        //console.log('>>', boardResponseDto.id);
        this.t1.push({id: boardResponseDto.pit, tileCount: boardResponseDto.tokenCount, rows: boardResponseDto.kalah?2:1 , color: boardResponseDto.playerSide===BoardResponseDto.PlayerSideEnum.Blue?'blue':'red', player: boardResponseDto.playerSide!})
      }  ); 
  }


   
  public move(pit: number) {
    console.log('kerem')
    this.gameplayControllerService.makeMove(this.gameResponseDto.id!, pit).subscribe(result => {this.board = result
    this.t1.forEach(
      tt => this.board.boardResponseDtos?.filter(boa => boa.pit === tt.id /*kerem bu map olsun*/).map(boa => tt.tileCount = boa.tokenCount)
    )
    });

  }



  tiles: any[] = [
    {text: 'Two1', cols: 1, rows: 2, color: 'lightblue', id:1},
    {text: 'Three1', cols: 1, rows: 1, color: 'lightblue', id:4},
    {text: 'Four1', cols: 1, rows: 1, color: 'lightblue', id:5},
    {text: 'Five1', cols: 1, rows: 1, color: 'lightblue', id:5},
    {text: 'Two2', cols: 1, rows: 2, color: 'lightblue', id:3},
    {text: 'Three2', cols: 1, rows: 1, color: 'lightblue', id:4},
    {text: 'Four2', cols: 1, rows: 1, color: 'lightblue', id:5},
    {text: 'Five2', cols: 1, rows: 1, color: 'lightblue', id:5},

  ];
}

export interface Tile1{
  id?: number;
  tileCount?: number;
  rows: number;
  color: string
  player: BoardResponseDto.PlayerSideEnum;
}
