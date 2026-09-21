import { describe, expect, it } from 'vitest';
import { PlayGameInteractor } from '../../../src/application/use-cases/PlayGameInteractor';
import { Game } from '../../../src/domain/Game';
import { Weapon } from '../../../src/domain/Weapon';
import { CliGameRunner } from '../../../src/frameworks/cli/CliGameRunner';
import { GameController } from '../../../src/interface-adapters/controllers/GameController';
import { JsonGamePresenter } from '../../../src/interface-adapters/presenters/JsonGamePresenter';
import { FakeOpponentWeaponProvider } from '../../support/FakeOpponentWeaponProvider';
import { GameViewSpy } from '../../support/GameViewSpy';
import { InputReaderFake } from '../../support/InputReaderFake';

describe('Flujo CLI con JsonGamePresenter', () => {
    it('presenta papel contra piedra como una victoria JSON', async () => {
        const { view, opponentWeaponProvider, runner } = createJsonCli('papel');

        await runner.start();

        expect(opponentWeaponProvider.chooseCalls).toBe(1);
        expect(view.results).toHaveLength(1);
        expect(view.results[0]?.fullOutput).toBe(
            '{"playerWeapon":"paper","opponentWeapon":"rock","result":"win"}',
        );
        expect(view.errors).toHaveLength(0);
    });

    it('presenta el error JSON sin ejecutar el interactor', async () => {
        const { view, opponentWeaponProvider, runner } = createJsonCli('lagarto');

        await runner.start();

        expect(opponentWeaponProvider.chooseCalls).toBe(0);
        expect(view.errors).toEqual([{
            errorMessage: '{"error":"invalid_selection"}',
        }]);
        expect(view.results).toHaveLength(0);
    });
});

function createJsonCli(selection: string): {
    view: GameViewSpy;
    opponentWeaponProvider: FakeOpponentWeaponProvider;
    runner: CliGameRunner;
} {
    const view = new GameViewSpy();
    const presenter = new JsonGamePresenter(view);
    const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
    const interactor = new PlayGameInteractor(
        new Game(),
        opponentWeaponProvider,
        presenter,
    );
    const controller = new GameController(interactor, presenter);
    const runner = new CliGameRunner(
        new InputReaderFake(selection),
        controller,
    );

    return { view, opponentWeaponProvider, runner };
}
