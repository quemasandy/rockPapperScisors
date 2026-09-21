import { describe, expect, it } from 'vitest';
import { Weapon } from '../../../../src/domain/Weapon';
import { AnalyzeWeaponPresenter } from '../../../../src/interface-adapters/presenters/AnalyzeWeaponPresenter';
import { AnalyzeWeaponViewSpy } from '../../../support/AnalyzeWeaponViewSpy';

describe('AnalyzeWeaponPresenter', () => {
    it('serializa el análisis completo de un arma', () => {
        const view = new AnalyzeWeaponViewSpy();
        const presenter = new AnalyzeWeaponPresenter(view);

        presenter.present({
            weapon: Weapon.Rock,
            winsAgainst: [Weapon.Scissors],
            losesAgainst: [Weapon.Paper],
            drawsAgainst: [Weapon.Rock],
        });

        expect(view.analyses).toEqual([{
            fullOutput:
                '{"weapon":"rock","winsAgainst":["scissors"],"losesAgainst":["paper"],"drawsAgainst":["rock"]}',
        }]);
        expect(view.errors).toHaveLength(0);
    });

    it('serializa un arma inválida', () => {
        const view = new AnalyzeWeaponViewSpy();
        const presenter = new AnalyzeWeaponPresenter(view);

        presenter.presentInvalidSelection();

        expect(view.errors).toEqual([{
            errorMessage: '{"error":"invalid_selection"}',
        }]);
        expect(view.analyses).toHaveLength(0);
    });
});
