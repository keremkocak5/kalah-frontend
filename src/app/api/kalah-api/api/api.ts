export * from './gameController.service';
import { GameControllerService } from './gameController.service';
export * from './playController.service';
import { PlayControllerService } from './playController.service';
export const APIS = [GameControllerService, PlayControllerService];
