import { describe, it, expect } from 'vitest';
import { Game, GameResult } from '../Game';
import { Weapon } from '../Weapon';
import { FakeRandomNumberGenerator } from './FakeRandomNumberGenerator';

describe('Game', () => {
    // Helper: crea un Game donde la máquina siempre elige un arma específica
    function createGameWithMachineWeapon(weaponIndex: number): Game {
        return new Game(new FakeRandomNumberGenerator(weaponIndex));
    }

    describe('Empates', () => {
        it('Piedra vs Piedra = Empate', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { result } = game.play(Weapon.Rock);
            expect(result).toBe(GameResult.Draw);
        });

        it('Papel vs Papel = Empate', () => {
            const game = createGameWithMachineWeapon(1); // Máquina: Papel
            const { result } = game.play(Weapon.Paper);
            expect(result).toBe(GameResult.Draw);
        });

        it('Tijeras vs Tijeras = Empate', () => {
            const game = createGameWithMachineWeapon(2); // Máquina: Tijeras
            const { result } = game.play(Weapon.Scissors);
            expect(result).toBe(GameResult.Draw);
        });
    });

    describe('Victorias del jugador', () => {
        it('Piedra vence a Tijeras', () => {
            const game = createGameWithMachineWeapon(2); // Máquina: Tijeras
            const { result } = game.play(Weapon.Rock);
            expect(result).toBe(GameResult.Win);
        });

        it('Papel vence a Piedra', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { result } = game.play(Weapon.Paper);
            expect(result).toBe(GameResult.Win);
        });

        it('Tijeras vence a Papel', () => {
            const game = createGameWithMachineWeapon(1); // Máquina: Papel
            const { result } = game.play(Weapon.Scissors);
            expect(result).toBe(GameResult.Win);
        });
    });

    describe('Derrotas del jugador', () => {
        it('Piedra pierde contra Papel', () => {
            const game = createGameWithMachineWeapon(1); // Máquina: Papel
            const { result } = game.play(Weapon.Rock);
            expect(result).toBe(GameResult.Lose);
        });

        it('Papel pierde contra Tijeras', () => {
            const game = createGameWithMachineWeapon(2); // Máquina: Tijeras
            const { result } = game.play(Weapon.Paper);
            expect(result).toBe(GameResult.Lose);
        });

        it('Tijeras pierde contra Piedra', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { result } = game.play(Weapon.Scissors);
            expect(result).toBe(GameResult.Lose);
        });
    });

    describe('Devuelve el arma de la máquina', () => {
        it('debería informar qué arma eligió la máquina', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { machineWeapon } = game.play(Weapon.Scissors);
            expect(machineWeapon).toBe(Weapon.Rock);
        });
    });
});
