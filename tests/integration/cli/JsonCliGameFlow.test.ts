import { describe, expect, it } from 'vitest';
import { PlayGameInteractor } from '../../../src/application/use-cases/PlayGameInteractor';
import { Game } from '../../../src/domain/Game';
import { Weapon } from '../../../src/domain/Weapon';
import { CliGameRunner } from '../../../src/frameworks/cli/CliGameRunner';
import { GameController } from '../../../src/interface-adapters/controllers/GameController';
import { JsonGamePresenter } from '../../../src/interface-adapters/presenters/JsonGamePresenter';
import { FakeOpponentWeaponProvider } from '../../support/FakeOpponentWeaponProvider';
import { InputReaderFake } from '../../support/InputReaderFake';

describe('Flujo CLI con JsonGamePresenter', () => {
    it('presenta papel contra piedra como una victoria JSON', async () => {
        const { lines, opponentWeaponProvider, runner } = createJsonCli('papel');

        await runner.start();

        expect(opponentWeaponProvider.chooseCalls).toBe(1);
        expect(lines).toEqual([
            '{"playerWeapon":"paper","opponentWeapon":"rock","result":"win"}',
        ]);
    });

    it('presenta el error JSON sin ejecutar el interactor', async () => {
        const { lines, opponentWeaponProvider, runner } = createJsonCli('lagarto');

        await runner.start();

        expect(opponentWeaponProvider.chooseCalls).toBe(0);
        expect(lines).toEqual(['{"error":"invalid_selection"}']);
    });
});

function createJsonCli(selection: string): {
    lines: string[];
    opponentWeaponProvider: FakeOpponentWeaponProvider;
    runner: CliGameRunner;
} {
    const lines: string[] = [];
    const presenter = new JsonGamePresenter((line) => lines.push(line));
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

    return { lines, opponentWeaponProvider, runner };
}
