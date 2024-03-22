import { Pipe, PipeTransform } from '@angular/core';
import { GameResponseDto } from '../api/kalah-api';
@Pipe({
    standalone: true,
    name: 'winnerConverter'
  })
  export class WinnerPipe implements PipeTransform {
    transform(value: GameResponseDto): string {
        if(value.status === GameResponseDto.StatusEnum.GameOverDraw) {
            return 'No winners';
        }
        return value.winner === GameResponseDto.TurnEnum.Blue ? value.playerBlueName! : value.playerRedName!;
    }
  }