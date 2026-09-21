import { describe, expect, it } from 'vitest';
import { AnalyzeWeaponInteractor } from '../../../src/application/use-cases/AnalyzeWeaponInteractor';
import { Game } from '../../../src/domain/Game';
import { CliCommandRouter } from '../../../src/frameworks/cli/CliCommandRouter';
import { AnalyzeWeaponController } from '../../../src/interface-adapters/controllers/AnalyzeWeaponController';
import { AnalyzeWeaponPresenter } from '../../../src/interface-adapters/presenters/AnalyzeWeaponPresenter';
import { AnalyzeWeaponViewSpy } from '../../support/AnalyzeWeaponViewSpy';

class UnusedPlayCommand {
    startCalls = 0;

    async start(): Promise<void> {
        this.startCalls += 1;
    }
}

describe('Flujo CLI del comando analyze', () => {
    it('analiza piedra sin ejecutar el flujo de jugar', async () => {
        const view = new AnalyzeWeaponViewSpy();
        const presenter = new AnalyzeWeaponPresenter(view);
        const interactor = new AnalyzeWeaponInteractor(new Game(), presenter);
        const controller = new AnalyzeWeaponController(interactor, presenter);
        const playCommand = new UnusedPlayCommand();
        const router = new CliCommandRouter(playCommand, controller);

        await router.run(['analyze', 'piedra']);

        expect(view.analyses).toEqual([{
            fullOutput:
                '{"weapon":"rock","winsAgainst":["scissors"],"losesAgainst":["paper"],"drawsAgainst":["rock"]}',
        }]);
        expect(view.errors).toHaveLength(0);
        expect(playCommand.startCalls).toBe(0);
    });
});
