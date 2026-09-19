import { Game } from '../../domain/Game';
import type {
    PlayGameInputBoundary,
    PlayGameRequest,
} from '../ports/input/PlayGameInputBoundary';
import type { OpponentWeaponProvider } from '../ports/output/OpponentWeaponProvider';
import type { PlayGameOutputBoundary } from '../ports/output/PlayGameOutputBoundary';

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
