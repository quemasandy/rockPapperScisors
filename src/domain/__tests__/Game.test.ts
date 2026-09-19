import { describe, it, expect } from 'vitest';
import { Game } from '../Game';
import { GameResult } from '../GameResult';
import { Weapon } from '../Weapon';

describe('Game', () => {
    describe('Empates', () => {
        it.each([
            ['Piedra vs Piedra = Empate', Weapon.Rock, Weapon.Rock],
            ['Papel vs Papel = Empate', Weapon.Paper, Weapon.Paper],
            ['Tijeras vs Tijeras = Empate', Weapon.Scissors, Weapon.Scissors],
        ])('%s', (_description, playerWeapon, opponentWeapon) => {
            const game = new Game();

            expect(game.play(playerWeapon, opponentWeapon)).toEqual({
                result: GameResult.Draw,
                opponentWeapon,
            });
        });
    });

    describe('Victorias del jugador', () => {
        it.each([
            ['Piedra vence a Tijeras', Weapon.Rock, Weapon.Scissors],
            ['Papel vence a Piedra', Weapon.Paper, Weapon.Rock],
            ['Tijeras vence a Papel', Weapon.Scissors, Weapon.Paper],
        ])('%s', (_description, playerWeapon, opponentWeapon) => {
            const game = new Game();

            expect(game.play(playerWeapon, opponentWeapon)).toEqual({
                result: GameResult.Win,
                opponentWeapon,
            });
        });
    });

    describe('Derrotas del jugador', () => {
        it.each([
            ['Piedra pierde contra Papel', Weapon.Rock, Weapon.Paper],
            ['Papel pierde contra Tijeras', Weapon.Paper, Weapon.Scissors],
            ['Tijeras pierde contra Piedra', Weapon.Scissors, Weapon.Rock],
        ])('%s', (_description, playerWeapon, opponentWeapon) => {
            const game = new Game();

            expect(game.play(playerWeapon, opponentWeapon)).toEqual({
                result: GameResult.Lose,
                opponentWeapon,
            });
        });
    });
});
