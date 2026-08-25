import { describe, it, expect, vi } from 'vitest';
import { PlayGameUseCase } from '../PlayGameUseCase';
import { Weapon } from '../../domain/entities/Weapon';
import { Game, GameResult } from '../../domain/entities/Game';
import { FakeOpponentWeaponProvider } from './FakeOpponentWeaponProvider';

describe('PlayGameUseCase', () => {
    it('debería devolver un PlayGameOutput con resultado y arma de la máquina', () => {
        const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
        const game = new Game();
        const playSpy = vi.spyOn(game, 'play');
        const useCase = new PlayGameUseCase(game, opponentWeaponProvider);

        const output = useCase.execute(Weapon.Paper); // Papel vence a Piedra

        expect(playSpy).toHaveBeenCalledExactlyOnceWith(Weapon.Paper, Weapon.Rock);
        expect(output.result).toBe(GameResult.Win);
        expect(output.machineWeapon).toBe(Weapon.Rock);
        expect(opponentWeaponProvider.chooseCalls).toBe(1);
    });

    it('debería devolver Lose cuando la máquina gana', () => {
        const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
        const useCase = new PlayGameUseCase(new Game(), opponentWeaponProvider);

        const output = useCase.execute(Weapon.Scissors); // Tijeras pierde contra Piedra

        expect(output.result).toBe(GameResult.Lose);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería devolver Draw en empate', () => {
        const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
        const useCase = new PlayGameUseCase(new Game(), opponentWeaponProvider);

        const output = useCase.execute(Weapon.Rock); // Piedra vs Piedra

        expect(output.result).toBe(GameResult.Draw);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería implementar la interfaz PlayGameInput', () => {
        const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
        const useCase = new PlayGameUseCase(new Game(), opponentWeaponProvider);

        // Verifica que tiene el método execute
        expect(typeof useCase.execute).toBe('function');
    });
});
