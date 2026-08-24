import { Weapon } from '../domain/entities/Weapon';
import { GameResult } from '../domain/entities/Game';
import { GameViewModel, ErrorViewModel } from './GameViewModel';

// El Presenter es el objeto TESTEABLE.
// Recibe datos crudos del dominio y los transforma
// en un ViewModel con todo el formato listo.
// NO toca console.log, NO toca readline. Solo datos puros.
export class GamePresenter {
    private readonly weaponTextMap: Record<Weapon, string> = {
        [Weapon.Rock]: 'piedra',
        [Weapon.Paper]: 'papel',
        [Weapon.Scissors]: 'tijeras',
    };

    presentResult(
        playerWeapon: Weapon,
        machineWeapon: Weapon,
        result: GameResult
    ): GameViewModel {
        const playerWeaponText = this.weaponTextMap[playerWeapon];
        const machineWeaponText = this.weaponTextMap[machineWeapon];

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

        const resultEmoji = emojiMap[result];
        const resultMessage = messageMap[result];

        const fullOutput = [
            `\nTú elegiste: ${playerWeaponText}`,
            `La máquina eligió: ${machineWeaponText}`,
            `${resultEmoji} ${resultMessage}`,
        ].join('\n');

        return {
            playerWeaponText,
            machineWeaponText,
            resultEmoji,
            resultMessage,
            fullOutput,
        };
    }

    presentError(message: string): ErrorViewModel {
        return {
            errorMessage: `❌ Error: ${message}`,
        };
    }
}
