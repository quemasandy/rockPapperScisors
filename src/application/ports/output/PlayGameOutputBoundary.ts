import { GameResult } from '../../../domain/GameResult';
import { Weapon } from '../../../domain/Weapon';

export interface PlayGameResponse {
    playerWeapon: Weapon;
    opponentWeapon: Weapon;
    result: GameResult;
}

export interface PlayGameOutputBoundary {
    present(response: PlayGameResponse): void;
}
