export * from './gameController.service';
import { GameControllerService } from './gameController.service';
export * from './gameplayController.service';
import { GameplayControllerService } from './gameplayController.service';
export const APIS = [GameControllerService, GameplayControllerService];
