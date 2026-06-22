import { Weapon } from "./Weapon";

export class Machine {
    private weapon: Weapon;
    
    constructor () {
        this.weapon = this.generateWeapon();
    }

    generateWeapon(): Weapon {
        const weapons = [Weapon.Rock, Weapon.Paper, Weapon.Scissors]
        const randomNumber = Math.floor(Math.random() * weapons.length)

        return weapons[randomNumber]
    }

    getWeapon() {
        return this.weapon
    }
}