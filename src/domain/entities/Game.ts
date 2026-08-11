import { Machine } from './Machine';
import { Weapon } from './Weapon';
import { RandomNumberGenerator } from '../ports/RandomNumberGenerator';

export enum GameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
}

export class Game {
    private machine: Machine;

    constructor(randomGenerator: RandomNumberGenerator) {
        this.machine = new Machine(randomGenerator);
    }

    play(playerWeapon: Weapon): { result: GameResult; machineWeapon: Weapon } {
        const machineWeapon = this.machine.generateWeapon();

        if (playerWeapon === machineWeapon) {
            return { result: GameResult.Draw, machineWeapon };
        }

        // Reglas de negocio: cada arma vence a exactamente una otra
        const winsAgainst: Record<Weapon, Weapon> = {
            [Weapon.Rock]: Weapon.Scissors,     // Piedra vence a Tijeras
            [Weapon.Paper]: Weapon.Rock,         // Papel vence a Piedra
            [Weapon.Scissors]: Weapon.Paper,     // Tijeras vence a Papel
        };

        const result = winsAgainst[playerWeapon] === machineWeapon
            ? GameResult.Win
            : GameResult.Lose;

        return { result, machineWeapon };
    }
}