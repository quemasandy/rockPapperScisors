import { Game } from '../../domain/Game';
import { GameResult } from '../../domain/GameResult';
import { Weapon } from '../../domain/Weapon';
import type {
    AnalyzeWeaponInputBoundary,
    AnalyzeWeaponRequest,
} from '../ports/input/AnalyzeWeaponInputBoundary';
import type { AnalyzeWeaponOutputBoundary } from '../ports/output/AnalyzeWeaponOutputBoundary';

export class AnalyzeWeaponInteractor implements AnalyzeWeaponInputBoundary {
    constructor(
        private readonly game: Game,
        private readonly outputBoundary: AnalyzeWeaponOutputBoundary,
    ) {}

    execute(request: AnalyzeWeaponRequest): void {
        const winsAgainst: Weapon[] = [];
        const losesAgainst: Weapon[] = [];
        const drawsAgainst: Weapon[] = [];

        for (const opponentWeapon of Object.values(Weapon)) {
            const round = this.game.play(request.weapon, opponentWeapon);

            switch (round.result) {
                case GameResult.Win:
                    winsAgainst.push(round.opponentWeapon);
                    break;
                case GameResult.Lose:
                    losesAgainst.push(round.opponentWeapon);
                    break;
                case GameResult.Draw:
                    drawsAgainst.push(round.opponentWeapon);
                    break;
            }
        }

        this.outputBoundary.present({
            weapon: request.weapon,
            winsAgainst,
            losesAgainst,
            drawsAgainst,
        });
    }
}
