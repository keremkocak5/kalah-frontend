import { BoardResponseDto } from "../api/kalah-api";

export interface BoardTile {
    id?: number;
    tileCount?: number;
    rows: number;
    color: string
    player: BoardResponseDto.PlayerSideEnum;
    isKalah: boolean;
  }