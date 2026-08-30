import { Game } from '../domain/entities/Game';
import { OpponentWeaponProvider } from './ports/OpponentWeaponProvider';
import {
    PlayGameInputBoundary,
    PlayGameOutputBoundary,
    PlayGameRequest,
} from './ports/PlayGame';

export class PlayGameInteractor implements PlayGameInputBoundary {
    constructor(
        private readonly game: Game,
        private readonly opponentWeaponProvider: OpponentWeaponProvider,
        private readonly outputBoundary: PlayGameOutputBoundary,
    ) {}

    execute(request: PlayGameRequest): void {
        const opponentWeapon = this.opponentWeaponProvider.choose();
        const round = this.game.play(request.playerWeapon, opponentWeapon);

        this.outputBoundary.present({
            playerWeapon: request.playerWeapon,
            opponentWeapon: round.opponentWeapon,
            result: round.result,
        });
    }
}
