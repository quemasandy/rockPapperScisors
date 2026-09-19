import { afterEach, describe, expect, it, vi } from 'vitest';
import { Weapon } from '../../../../src/domain/Weapon';
import { MathRandomOpponentWeaponProvider } from '../../../../src/frameworks/random/MathRandomOpponentWeaponProvider';

describe('MathRandomOpponentWeaponProvider', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        [0, Weapon.Rock],
        [Number.EPSILON, Weapon.Rock],
        [1 / 3 - Number.EPSILON, Weapon.Rock],
        [1 / 3, Weapon.Paper],
        [2 / 3 - Number.EPSILON, Weapon.Paper],
        [2 / 3, Weapon.Scissors],
        [1 - Number.EPSILON, Weapon.Scissors],
    ])('elige el arma correcta cuando Math.random devuelve %d', (random, expectedWeapon) => {
        vi.spyOn(Math, 'random').mockReturnValue(random);
        const provider = new MathRandomOpponentWeaponProvider();

        expect(provider.choose()).toBe(expectedWeapon);
    });

    it('hace alcanzables las tres armas sin devolver undefined', () => {
        vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(1 / 3)
            .mockReturnValueOnce(2 / 3);
        const provider = new MathRandomOpponentWeaponProvider();

        const chosenWeapons = [provider.choose(), provider.choose(), provider.choose()];

        expect(chosenWeapons).toEqual([Weapon.Rock, Weapon.Paper, Weapon.Scissors]);
        expect(chosenWeapons).not.toContain(undefined);
    });

    it.each([-Number.EPSILON, 1])(
        'rechaza el valor fuera de contrato %d de Math.random',
        (random) => {
            vi.spyOn(Math, 'random').mockReturnValue(random);
            const provider = new MathRandomOpponentWeaponProvider();

            expect(() => provider.choose()).toThrowError(
                new RangeError(
                    'Math.random() must return a value in the range [0, 1).',
                ),
            );
        },
    );
});
