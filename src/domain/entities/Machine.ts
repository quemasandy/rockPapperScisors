import { Weapon } from "./Weapon";
import { RandomNumberGenerator } from "../ports/RandomNumberGenerator";

export class Machine {
    constructor(private readonly randomGenerator: RandomNumberGenerator) {}

    generateWeapon(): Weapon {
        const weapons = [Weapon.Rock, Weapon.Paper, Weapon.Scissors];
        const index = this.randomGenerator.generate(0, weapons.length - 1);
        return weapons[index];
    }
}