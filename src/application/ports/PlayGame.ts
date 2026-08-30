import { GameResult } from '../../domain/entities/Game';
import { Weapon } from '../../domain/entities/Weapon';

export interface PlayGameRequest {
    playerWeapon: Weapon;
}

export interface PlayGameResponse {
    playerWeapon: Weapon;
    opponentWeapon: Weapon;
    result: GameResult;
}

export interface PlayGameInputBoundary {
    execute(request: PlayGameRequest): void;
}

export interface PlayGameOutputBoundary {
    present(response: PlayGameResponse): void;
}
