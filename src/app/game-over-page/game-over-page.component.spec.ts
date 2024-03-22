import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverPageComponent } from './game-over-page.component';

describe('GameOverPageComponent', () => {
  let component: GameOverPageComponent;
  let fixture: ComponentFixture<GameOverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameOverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
