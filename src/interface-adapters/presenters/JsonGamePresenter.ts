import { GameResult } from '../../domain/GameResult';
import { Weapon } from '../../domain/Weapon';
import type {
    PlayGameOutputBoundary,
    PlayGameResponse,
} from '../../application/ports/output/PlayGameOutputBoundary';
import type {
    InvalidInputOutputBoundary,
} from '../ports/InvalidInputOutputBoundary';
import type { GameView } from '../ports/GameView';

export class JsonGamePresenter
    implements PlayGameOutputBoundary, InvalidInputOutputBoundary
{
    private readonly weaponTextMap: Record<Weapon, string> = {
        [Weapon.Rock]: 'piedra',
        [Weapon.Paper]: 'papel',
        [Weapon.Scissors]: 'tijeras',
    };

    constructor(private readonly view: GameView) {}

    present(response: PlayGameResponse): void {
        const playerWeaponText = this.weaponTextMap[response.playerWeapon];
        const machineWeaponText = this.weaponTextMap[response.opponentWeapon];

        const emojiMap: Record<GameResult, string> = {
            [GameResult.Win]: '🎉',
            [GameResult.Lose]: '😢',
            [GameResult.Draw]: '🤝',
        };

        const messageMap: Record<GameResult, string> = {
            [GameResult.Win]: '¡Ganaste!',
            [GameResult.Lose]: 'Perdiste.',
            [GameResult.Draw]: '¡Empate!',
        };

        const fullOutput = JSON.stringify({
            playerWeapon: response.playerWeapon,
            opponentWeapon: response.opponentWeapon,
            result: response.result,
        });

        this.view.showResult({
            playerWeaponText,
            machineWeaponText,
            resultEmoji: emojiMap[response.result],
            resultMessage: messageMap[response.result],
            fullOutput,
        });
    }

    presentInvalidSelection(): void {
        this.view.showError({
            errorMessage: JSON.stringify({ error: 'invalid_selection' }),
        });
    }
}
