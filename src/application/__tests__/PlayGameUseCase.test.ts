import { describe, it, expect } from 'vitest';
import { PlayGameUseCase } from '../PlayGameUseCase';
import { Weapon } from '../../domain/entities/Weapon';
import { GameResult } from '../../domain/entities/Game';
import { FakeRandomNumberGenerator } from '../../domain/entities/__tests__/FakeRandomNumberGenerator';

describe('PlayGameUseCase', () => {
    it('debería devolver un PlayGameOutput con resultado y arma de la máquina', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0); // Máquina: Piedra
        const useCase = new PlayGameUseCase(fakeRandom);

        const output = useCase.execute(Weapon.Paper); // Papel vence a Piedra

        expect(output.result).toBe(GameResult.Win);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería devolver Lose cuando la máquina gana', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0); // Máquina: Piedra
        const useCase = new PlayGameUseCase(fakeRandom);

        const output = useCase.execute(Weapon.Scissors); // Tijeras pierde contra Piedra

        expect(output.result).toBe(GameResult.Lose);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería devolver Draw en empate', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0); // Máquina: Piedra
        const useCase = new PlayGameUseCase(fakeRandom);

        const output = useCase.execute(Weapon.Rock); // Piedra vs Piedra

        expect(output.result).toBe(GameResult.Draw);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería implementar la interfaz PlayGameInput', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0);
        const useCase = new PlayGameUseCase(fakeRandom);

        // Verifica que tiene el método execute
        expect(typeof useCase.execute).toBe('function');
    });
});
