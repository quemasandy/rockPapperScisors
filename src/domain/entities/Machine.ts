import { RandomNumberGenerator } from "../ports/RandomNumberGenerator";
import { Weapon } from "./Weapon";

export class Machine {
    private weapon: Weapon;
    
    constructor (private randomNumberGenerator: RandomNumberGenerator) {
        this.weapon = this.generateWeapon();
    }

    generateWeapon(): Weapon {
        const weapons = [Weapon.Rock, Weapon.Paper, Weapon.Scissors]
        const randomNumber = this.randomNumberGenerator.generate(0, weapons.length)

        return weapons[randomNumber]
    }

    getWeapon() {
        return this.weapon
    }
}