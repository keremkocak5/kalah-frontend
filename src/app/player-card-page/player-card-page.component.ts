import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player-card-page',
  standalone: true,
  imports: [MatIconModule, FlexLayoutModule, MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './player-card-page.component.html',
  styleUrl: './player-card-page.component.scss'
})
export class PlayerCardComponent {

  @Input() playerName!: string;
  @Input() playersTurn!: boolean;
  @Input() playerColor!: string;

}
