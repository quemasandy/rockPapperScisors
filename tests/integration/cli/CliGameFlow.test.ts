import { describe, expect, it } from 'vitest';
import { PlayGameInteractor } from '../../../src/application/use-cases/PlayGameInteractor';
import { Game } from '../../../src/domain/Game';
import { Weapon } from '../../../src/domain/Weapon';
import { CliGameRunner } from '../../../src/frameworks/cli/CliGameRunner';
import { GameController } from '../../../src/interface-adapters/controllers/GameController';
import { GamePresenter } from '../../../src/interface-adapters/presenters/GamePresenter';
import { FakeOpponentWeaponProvider } from '../../support/FakeOpponentWeaponProvider';
import { GameViewSpy } from '../../support/GameViewSpy';
import { InputReaderFake } from '../../support/InputReaderFake';

describe('Flujo CLI', () => {
    it('ejecuta una ronda completa con adapters en memoria', async () => {
        const inputReader = new InputReaderFake('papel');
        const view = new GameViewSpy();
        const presenter = new GamePresenter(view);
        const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
        const interactor = new PlayGameInteractor(
            new Game(),
            opponentWeaponProvider,
            presenter,
        );
        const controller = new GameController(interactor, presenter);
        const runner = new CliGameRunner(inputReader, controller);

        await runner.start();

        expect(inputReader.prompts).toEqual([
            'Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ',
        ]);
        expect(opponentWeaponProvider.chooseCalls).toBe(1);
        expect(view.results).toEqual([
            {
                playerWeaponText: 'papel',
                machineWeaponText: 'piedra',
                resultEmoji: '🎉',
                resultMessage: '¡Ganaste!',
                fullOutput:
                    '\nTú elegiste: papel\nLa máquina eligió: piedra\n🎉 ¡Ganaste!',
            },
        ]);
        expect(view.errors).toHaveLength(0);
    });
});
