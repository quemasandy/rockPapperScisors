import { Game } from '../domain/entities/Game';
import { Machine } from '../domain/entities/Machine';
import { Weapon } from '../domain/entities/Weapon';
import { PlayGameInput, PlayGameOutput } from '../domain/ports/PlayGame';
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator';

export class PlayGameUseCase implements PlayGameInput {
    private game: Game;
    private machine: Machine;

    constructor(randomGenerator: RandomNumberGenerator) {
        this.game = new Game();
        this.machine = new Machine(randomGenerator);
    }

    execute(playerWeapon: Weapon): PlayGameOutput {
        const opponentWeapon = this.machine.generateWeapon();
        const round = this.game.play(playerWeapon, opponentWeapon);

        return {
            result: round.result,
            machineWeapon: round.opponentWeapon,
        };
    }
}
