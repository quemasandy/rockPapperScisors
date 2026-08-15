import { Game } from '../domain/entities/Game';
import { Weapon } from '../domain/entities/Weapon';
import { PlayGameInput, PlayGameOutput } from '../domain/ports/PlayGame';
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator';

export class PlayGameUseCase implements PlayGameInput {
    private game: Game;

    constructor(randomGenerator: RandomNumberGenerator) {
        this.game = new Game(randomGenerator);
    }

    execute(playerWeapon: Weapon): PlayGameOutput {
        return this.game.play(playerWeapon);
    }
}
