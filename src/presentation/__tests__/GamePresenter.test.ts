import { describe, it, expect } from 'vitest';
import { GamePresenter } from '../GamePresenter';
import { Weapon } from '../../domain/entities/Weapon';
import { GameResult } from '../../domain/entities/Game';

describe('GamePresenter', () => {
    const presenter = new GamePresenter();

    it.each([
        [Weapon.Rock, 'piedra'],
        [Weapon.Paper, 'papel'],
        [Weapon.Scissors, 'tijeras'],
    ])('debería traducir %s como %s', (weapon, expectedText) => {
        const vm = presenter.presentResult(weapon, weapon, GameResult.Draw);

        expect(vm.playerWeaponText).toBe(expectedText);
        expect(vm.machineWeaponText).toBe(expectedText);
        expect(vm.fullOutput).not.toMatch(/\b(?:rock|paper|scissors)\b/);
    });

    it('debería formatear un resultado de victoria con emoji 🎉', () => {
        const vm = presenter.presentResult(Weapon.Rock, Weapon.Scissors, GameResult.Win);

        expect(vm.resultEmoji).toBe('🎉');
        expect(vm.resultMessage).toBe('¡Ganaste!');
        expect(vm.playerWeaponText).toBe('piedra');
        expect(vm.machineWeaponText).toBe('tijeras');
        expect(vm.fullOutput).toContain('🎉 ¡Ganaste!');
    });

    it('debería formatear un resultado de derrota con emoji 😢', () => {
        const vm = presenter.presentResult(Weapon.Scissors, Weapon.Rock, GameResult.Lose);

        expect(vm.resultEmoji).toBe('😢');
        expect(vm.resultMessage).toBe('Perdiste.');
        expect(vm.fullOutput).toContain('😢 Perdiste.');
    });

    it('debería formatear un empate con emoji 🤝', () => {
        const vm = presenter.presentResult(Weapon.Paper, Weapon.Paper, GameResult.Draw);

        expect(vm.resultEmoji).toBe('🤝');
        expect(vm.resultMessage).toBe('¡Empate!');
        expect(vm.fullOutput).toContain('🤝 ¡Empate!');
    });

    it('debería incluir ambas armas en el output completo', () => {
        const vm = presenter.presentResult(Weapon.Paper, Weapon.Rock, GameResult.Win);

        expect(vm.fullOutput).toContain('papel');
        expect(vm.fullOutput).toContain('piedra');
    });

    it('debería formatear errores con el prefijo ❌', () => {
        const errorVM = presenter.presentError('Opción inválida');

        expect(errorVM.errorMessage).toBe('❌ Error: Opción inválida');
    });
});
