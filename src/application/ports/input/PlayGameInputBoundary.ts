import { Weapon } from '../../../domain/Weapon';

export interface PlayGameRequest {
    playerWeapon: Weapon;
}

export interface PlayGameInputBoundary {
    execute(request: PlayGameRequest): void;
}
