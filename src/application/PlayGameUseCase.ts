import { Game } from '../domain/entities/Game';
import { Weapon } from '../domain/entities/Weapon';
import { PlayGameInput, PlayGameOutput } from '../domain/ports/PlayGame';
import { OpponentWeaponProvider } from './ports/OpponentWeaponProvider';

export class PlayGameUseCase implements PlayGameInput {
    constructor(
        private readonly game: Game,
        private readonly opponentWeaponProvider: OpponentWeaponProvider,
    ) {}

    execute(playerWeapon: Weapon): PlayGameOutput {
        const opponentWeapon = this.opponentWeaponProvider.choose();
        const round = this.game.play(playerWeapon, opponentWeapon);

        return {
            result: round.result,
            machineWeapon: round.opponentWeapon,
        };
    }
}
